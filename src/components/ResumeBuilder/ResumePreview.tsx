import React from 'react';
import  {ResumeProfile}  from '../../types/resume';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Printer } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeProfile;
  enhancedContent?: any;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, enhancedContent }) => {
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  const displayContent = enhancedContent || data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={downloadPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          <Printer className="w-4 h-4" />
          <span>Print</span>
        </button>
      </div>

      <div ref={resumeRef} className="bg-white p-8 shadow-lg">
        {/* Personal Info Section */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayContent.personalInfo.fullName}</h1>
          <div className="text-gray-600 space-y-1">
            <p>{displayContent.personalInfo.email} • {displayContent.personalInfo.phone}</p>
            <p>{displayContent.personalInfo.location}</p>
            <div className="flex space-x-4">
              {displayContent.personalInfo.linkedin && (
                <a href={displayContent.personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
              )}
              {displayContent.personalInfo.github && (
                <a href={displayContent.personalInfo.github} className="text-blue-600 hover:underline">GitHub</a>
              )}
              {displayContent.personalInfo.portfolio && (
                <a href={displayContent.personalInfo.portfolio} className="text-blue-600 hover:underline">Portfolio</a>
              )}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          {displayContent.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                  <p className="text-gray-600">{exp.company} • {exp.location}</p>
                </div>
                <p className="text-gray-600">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
              </div>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          {displayContent.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                </div>
                <p className="text-gray-600">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(
              displayContent.skills.reduce((acc: any, skill: any) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {})
            ).map(([category, skills]: [string, any]) => (
              <div key={category}>
                <h3 className="font-semibold mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: any, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-md text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
          {displayContent.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-700 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.skillsUsed.map((skill: string, skillIndex: number) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-100 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};