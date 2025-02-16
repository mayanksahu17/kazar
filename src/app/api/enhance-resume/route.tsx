import { ResumeProfile } from '@/types/resume';

export async function enhanceResume(resumeData: ResumeProfile, jobDescription?: string) {
  const prompt = `
    Please enhance the following resume content to be more impactful and professional.
    ${jobDescription ? `Optimize it for the following job description: ${jobDescription}` : ''}
    
    Current Resume:
    ${JSON.stringify(resumeData, null, 2)}
    
    Please provide specific improvements:
    1. Make bullet points more action-oriented and quantifiable
    2. Highlight key achievements and metrics
    3. Use industry-standard terminology
    4. Ensure consistent formatting
    5. Optimize for ATS systems
  `;

  try {
    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume writer and career coach. Your task is to enhance resumes to be more impactful and professional.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    const data = await response.json();
    const enhancedContent = JSON.parse(data.choices[0].message.content);

    return {
      ...resumeData,
      ...enhancedContent,
      atsScore: calculateATSScore(enhancedContent),
    };
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return resumeData;
  }
}

function calculateATSScore(resume: ResumeProfile): number {
  let score = 0;
  const maxScore = 100;

  // Basic information completeness
  if (resume.personalInfo.email) score += 10;
  if (resume.personalInfo.phone) score += 10;
  if (resume.personalInfo.linkedin) score += 5;

  // Education
  if (resume.education.length > 0) score += 15;

  // Experience
  if (resume.experience.length > 0) {
    score += 20;
    // Bonus for detailed descriptions
    score += Math.min(10, resume.experience.reduce((acc, exp) => 
      acc + (exp.description.length > 100 ? 2 : 0), 0));
  }

  // Skills
  if (resume.skills.length > 0) score += 15;

  // Projects
  if (resume.projects.length > 0) score += 15;

  return Math.min(maxScore, score);
}

export default enhanceResume;