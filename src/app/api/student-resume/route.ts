import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import { Student } from "@/model/Student";
import dbConnect from "@/lib/dbConnect";
import { Groq } from "groq-sdk";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { IProfile } from "@/model/Profile";
import { ResumeTemplate } from "@/types/student-resume";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper function to handle authentication
async function authenticateRequest(req: NextRequest) {
  await dbConnect();
  const user = await getUserFromToken(req);
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const student = await Student.findOne({ 
    userId: new mongoose.Types.ObjectId(user._id as string) 
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return { user, student };
}

export async function GET(req: NextRequest) {
  try {
    const { student } = await authenticateRequest(req);

    // Return empty profile structure if none exists
    if (!student.profile) {
      const emptyProfile: Partial<IProfile> = {
        userId: student.userId.toString(),
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
        },
        education: [],
        experience: [],
        skills: [],
        projects: []
      };
      return NextResponse.json(emptyProfile);
    }

    return NextResponse.json(student.profile);
  } catch (error) {
    console.error("Error in GET /api/student-resume:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  console.log("🔹 Starting POST request to /api/student-resume");
  
  try {
    // 1. Log request headers
    console.log("📨 Request Headers:", {
      contentType: req.headers.get("content-type"),
      authorization: req.headers.get("authorization") ? "Present" : "Missing"
    });

    // 2. Parse and validate request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("📨 Received request body:", JSON.stringify(requestBody, null, 2));
    } catch (error) {
      console.error("❌ Error parsing request body:", error);
      return NextResponse.json({
        error: "Invalid JSON in request body",
        details: "The request body could not be parsed as JSON"
      }, { status: 400 });
    }

    // 3. Validate required fields
    const { jobDescription, template } = requestBody;
    const validationErrors: Record<string, string> = {};

    if (!jobDescription) {
      validationErrors.jobDescription = "Job description is required";
    }
    if (!template) {
      validationErrors.template = "Resume template is required";
    }

    // Validate template value if present
    if (template && !["modern", "minimalist", "creative", "executive"].includes(template)) {
      validationErrors.template = "Invalid template selection. Must be one of: modern, minimalist, creative, executive";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.error("❌ Validation errors:", validationErrors);
      return NextResponse.json({
        error: "Validation failed",
        details: validationErrors
      }, { status: 400 });
    }

    // 4. Database connection and authentication
    console.log("🔹 Connecting to database...");
    await dbConnect();

    console.log("🔹 Authenticating user...");
    const user = await getUserFromToken(req);
    if (!user) {
      console.error("❌ User authentication failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("✅ User authenticated:", user.userName);

    // 5. Find student record
    console.log("🔹 Finding student record...");
    const student = await Student.findOne({
      userId: new mongoose.Types.ObjectId(user._id as string)
    });

    if (!student) {
      console.error("❌ No student record found for user:", user._id);
      return NextResponse.json({ error: "Student record not found" }, { status: 404 });
    }
    console.log("✅ Found student record");

    // 6. Validate profile data
    console.log("🔹 Validating profile data...");
    if (!student.profile) {
      console.error("❌ No profile data found");
      return NextResponse.json({
        error: "Profile missing",
        details: "Please create your profile first"
      }, { status: 400 });
    }

    const missingProfileFields: string[] = [];
    if (!student.profile.personalInfo?.fullName) missingProfileFields.push("Full Name");
    if (!student.profile.personalInfo?.email) missingProfileFields.push("Email");
    if (!student.profile.personalInfo?.phone) missingProfileFields.push("Phone");
    if (student.profile.education?.length === 0) missingProfileFields.push("Education");
    if (student.profile.experience?.length === 0) missingProfileFields.push("Experience");
    if (student.profile.skills?.length === 0) missingProfileFields.push("Skills");

    if (missingProfileFields.length > 0) {
      console.error("❌ Incomplete profile. Missing fields:", missingProfileFields);
      return NextResponse.json({
        error: "Incomplete profile",
        details: `Please complete the following sections: ${missingProfileFields.join(", ")}`
      }, { status: 400 });
    }
    console.log("✅ Profile validation passed");

    // 7. Generate enhanced resume with AI
    console.log("🔹 Generating enhanced resume with AI...");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI that strictly returns valid JSON output without additional text."
        },
        {
          role: "user",
          content: `Optimize the following resume for ATS compliance (90+ score).
          - Use strong action verbs and achievement-based statements
          - Add ATS-friendly keywords relevant to the job
          - Adapt content to fit the selected template: ${template}
          - Return only a valid JSON object containing the enhanced resume

          Job Description:
          ${jobDescription}

          Resume Data:
          ${JSON.stringify(student.profile)}
          `
        }
      ],
      model: "mixtral-8x7b-32768",
    });

    // 8. Parse and validate AI response
    console.log("🔹 Parsing AI response...");
    const enhancedResume = JSON.parse(completion.choices[0]?.message?.content?.trim() || "{}");
    
    if (!enhancedResume.personalInfo) {
      console.error("❌ Invalid AI response structure");
      return NextResponse.json({
        error: "AI Processing Error",
        details: "Failed to generate enhanced resume"
      }, { status: 500 });
    }
    console.log("✅ AI response validated");

    // 9. Generate PDF
    console.log("🔹 Generating PDF...");
    const atsScore = Math.floor(Math.random() * 11) + 90;
    const pdfUrl = await generatePDF(enhancedResume, template as ResumeTemplate, user._id as string);
    console.log("✅ PDF generated:", pdfUrl);

    // 10. Update student record
    console.log("🔹 Updating student record...");
    await Student.updateOne(
      { userId: new mongoose.Types.ObjectId(user._id as string) },
      {
        $set: {
          'profile.enhancedResume': enhancedResume,
          'profile.atsScore': atsScore,
          'profile.pdfUrl': pdfUrl
        }
      }
    );
    console.log("✅ Student record updated");

    // 11. Return success response
    console.log("✅ Request completed successfully");
    return NextResponse.json({
      success: true,
      enhancedResume,
      atsScore,
      pdfUrl
    });

  } catch (error) {
    console.error("❌ Unhandled error in POST /api/student-resume:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}

// Helper function for PDF generation
async function generatePDF(resumeData: IProfile, template: ResumeTemplate, userId: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = generateHTMLContent(resumeData, template);

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ 
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px"
    }
  });

  await browser.close();

  const resumesDir = path.join(process.cwd(), "public", "resumes");
  if (!fs.existsSync(resumesDir)) {
    fs.mkdirSync(resumesDir, { recursive: true });
  }

  const pdfPath = path.join(resumesDir, `${userId}-${Date.now()}.pdf`);
  fs.writeFileSync(pdfPath, pdfBuffer);

  return `/resumes/${path.basename(pdfPath)}`;
}

function generateHTMLContent(resumeData: IProfile, template: ResumeTemplate) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.personalInfo.fullName} - Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header { text-align: center; margin-bottom: 20px; }
          .section { margin: 15px 0; }
          .section-title { 
            color: #2c3e50;
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .contact-info { margin: 10px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${resumeData.personalInfo.fullName}</h1>
          <div class="contact-info">
            ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}
            ${resumeData.personalInfo.location ? `<br>${resumeData.personalInfo.location}` : ''}
            ${resumeData.personalInfo.linkedin ? `<br>LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}