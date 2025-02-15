import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// FAQ content array
const FAQ_CONTENT = [
  {
    id: '1',
    name: 'Asking For Referral Over a Linkedin Note',
    subject: 'Connection Request',
    content: `Hello [Name],

I’m a graduate student at [University Name] and currently looking for summer internship opportunities. I came across a position at [Company Name] that aligns with my skills in [Relevant Field]. If possible, could you refer me to this job at [Company Name]?

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '2',
    name: 'Cold Email to HR for a Job with Job Link',
    subject: 'Job Application - [Job Title]',
    content: `Dear [HR Manager’s Name],

I hope this email finds you well. My name is [Your Name], and I came across the [Job Title] position at [Company Name] on [Job Platform]. With a strong background in [Relevant Skills], I’m eager to bring my expertise to your team.

I’ve attached my resume and would appreciate the opportunity to discuss how my experience aligns with the needs of your company.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Contact Information]`,
    updated: '8/18/2024',
  },
  {
    id: '3',
    name: 'Referral Request from a LinkedIn Connection',
    subject: 'Referral Request for [Job Title] at [Company Name]',
    content: `Hi [Connection’s Name],

I hope you’re doing well. I noticed an opening for a [Job Title] at [Company Name] and thought it would be a great fit for my background in [Relevant Skills]. If you’re comfortable, I’d greatly appreciate a referral.

I’ve attached my resume for your reference. Thank you for considering this request, and I’m happy to provide any additional information.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '4',
    name: 'Cold Email to a Tech Manager for Job Opportunity',
    subject: 'Exploring Opportunities in [Field/Technology]',
    content: `Dear [Manager’s Name],

I’m reaching out to introduce myself—my name is [Your Name], and I have a background in [Specific Field or Technology]. I noticed your work at [Company Name] and I am keen to explore any opportunities within your team.

I am particularly impressed by your recent project on [Project Name], and I believe my skills in [Relevant Skills] could contribute effectively.

Looking forward to the possibility of discussing this further.

Best regards,
[Your Name]
[Your Contact Information]`,
    updated: '8/18/2024',
  },
  {
    id: '5',
    name: 'Follow-Up Email After Applying for a Position',
    subject: 'Follow-Up on [Job Title] Application',
    content: `Dear [Hiring Manager’s Name],

I hope this message finds you well. I recently applied for the [Job Title] position at [Company Name] and wanted to reiterate my strong interest in the role. With my experience in [Relevant Skills], I am confident that I can contribute to your team.

I would appreciate any updates you can provide on my application.

Thank you for your time and consideration.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '6',
    name: 'LinkedIn Connection Request for Referral',
    subject: 'Connection Request and Referral Opportunity',
    content: `Hello [Name],

I’m reaching out to you based on your work in [Industry/Field] at [Company Name]. I am currently seeking opportunities in this area and would love to connect and potentially learn from your experience.

I appreciate your consideration and look forward to connecting.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '7',
    name: 'Cold Email to HR Asking for Opportunities',
    subject: 'Exploring Opportunities at [Company Name]',
    content: `Dear [HR Manager’s Name],

My name is [Your Name], and I’m currently exploring new opportunities in [Specific Field or Technology]. I’ve followed [Company Name] for some time and admire the innovative work you’re doing in [Specific Area].

If there are any openings that align with my skills, I would love to discuss how I can contribute to your team.

Thank you for your consideration.

Best regards,
[Your Name]
[Your Contact Information]`,
    updated: '8/18/2024',
  },
  {
    id: '8',
    name: 'Referral Request Email to a School Alumni',
    subject: 'Request for Referral from a Fellow [School Name] Alum',
    content: `Hi [Alumni Name],

I hope you’re doing well. I’m [Your Name], a fellow alum from [School Name]. I recently noticed a job opening for a [Job Title] at [Company Name] and believe my background in [Relevant Skills] would be a great match.

If you feel comfortable, I would greatly appreciate your referral. I’ve attached my resume for your review.

Thank you for considering this request.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '9',
    name: 'Cold Email for a Job Opportunity',
    subject: 'Interest in Opportunities at [Company Name]',
    content: `Dear [Hiring Manager’s Name],

I’m [Your Name], and I’m writing to express my interest in potential job opportunities within [Company Name]. With my extensive experience in [Relevant Skills], I am excited about the possibility of contributing to your team.

I’ve attached my resume and would welcome the chance to discuss how I can bring value to your company.

Thank you for your time.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  },
  {
    id: '10',
    name: 'Cold Email for Job Follow-Up',
    subject: 'Follow-Up on [Job Title] Application',
    content: `Dear [HR Manager’s Name],

I hope this email finds you well. I wanted to follow up on my application for the [Job Title] position at [Company Name]. I am very enthusiastic about this opportunity and would love to discuss how my skills in [Relevant Skills] can contribute to your team.

Looking forward to any updates you can provide.

Best regards,
[Your Name]`,
    updated: '8/18/2024',
  }
];


const FAQTable: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<typeof FAQ_CONTENT[0] | null>(null);

  const openModal = (faq: typeof FAQ_CONTENT[0]) => {
    setSelectedFAQ(faq);
  };

  const closeModal = () => {
    setSelectedFAQ(null);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 text-center">Message Templates</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">NAME</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">SUBJECT</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">UPDATED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {FAQ_CONTENT.map((faq) => (
                <tr
                  key={faq.id}
                  className="hover:bg-gray-100 cursor-pointer transition duration-200"
                  onClick={() => openModal(faq)}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">{faq.name}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{faq.subject}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{faq.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedFAQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4"
          >
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-10 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
              >
                <AiOutlineClose size={24} />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 pr-8">{selectedFAQ.subject}</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <input
                    type="text"
                    value="hr@example.com"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 bg-gray-50 text-gray-800 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={selectedFAQ.subject}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 bg-gray-50 text-gray-800 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={selectedFAQ.content}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 bg-gray-50 text-gray-800 shadow-sm h-32 sm:h-40 resize-none text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 sm:mt-6">
                <button
                  onClick={() => handleCopyContent(selectedFAQ.content)}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  <FiCopy className="mr-2" /> Copy Content
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default FAQTable;
