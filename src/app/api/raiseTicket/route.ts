import { NextRequest } from "next/server";
import { Ticket } from "@/model/Tickets";
import dbConnect from "@/lib/dbConnect";

export  async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { problemType, content, poc } = await req.json();

    // 2. Perform comprehensive data validation
    const validationErrors = [];

    if (!problemType || problemType.trim() === "") {
      validationErrors.push("problemType is required and cannot be empty.");
    }

    if (!content || content.trim() === "") {
      validationErrors.push("content is required and cannot be empty.");
    }

    if (!poc || poc.trim() === "") {
      validationErrors.push("poc (point of contact) is required and cannot be empty.");
    }

    if (validationErrors.length > 0) {
      const errorMessage = `Validation failed:\n  * ${validationErrors.join("\n  * ")}`;
      return new Response(errorMessage, { status: 400 }); // Bad Request
    }

    const sanitizedContent = content.replace(/<[^>]*>/g, "");
    const sanitizedPoc = poc.replace(/<[^>]*>/g, ""); 

    const newTicket = new Ticket({
      problemType,
      content: sanitizedContent,
      poc: sanitizedPoc,
    });

    try {
      await newTicket.save();
      console.log(`Ticket created successfully: ${newTicket._id}`);

      // 5. Send a professional response upon successful ticket creation
      const responseBody = {
        message: "Ticket created successfully. We will be in touch shortly.",
        ticketId: newTicket._id,
      };

      return new Response(JSON.stringify(responseBody), {
        status: 201, // Created
      });
    } catch (error) {
      console.error("Error saving ticket:", error);
      return new Response("An error occurred while creating the ticket. Please try again later.", {
        status: 500, // Internal Server Error
      });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response("Invalid request body format.", { status: 400 }); // Bad Request
  }
}
