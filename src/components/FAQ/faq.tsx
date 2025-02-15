import React, { useState } from 'react';

const FAQSection = () => {
  const faqs = [
    {
      question: 'What is the success rate?',
      answer: `70% of our users landed fulltime roles in 1 months. 47% of them are from the roles we applied to and remaining 44% are from their personal networking and individual efforts. According to U.S. Bureau of Labor Statistics found that the average period of unemployment in 2023 is five months. We cut short it to anywhere between 45 days to 3 months.`,
    },
    {
      question: 'How many recruiter calls will I get?',
      answer: `You will get 91% more calls than the recruiter calls you received when you applied by yourself. Let us get this straight, we are NOT doing any 'magic' here. All we are doing is taking away the meaningless grunt work from you and giving it to someone else so that you prioritize your mental effort for networking, interview prep, and more productive things. But if you still ask us about the industry benchmarks that we've been seeing so far in this bad job market, here are some numbers:
      For Grad Students and/or Those Needing Sponsorship: The response rate ranges between 0.5 to 2%, depending on the individual's profile and experience. For Experienced Professionals or Those Working on Hyped Modules like 'Generative AI' and/or Not Requiring Sponsorship: The response rate is approximately 1.5 to 3%.`,
    },
    {
      question: 'Why should I also shortlist the jobs when I am paying? Why not the HiredEasy Assistants do that?',
      answer: `Having assisted over 1300+ job seekers in landing full-time positions, we've identified several compelling reasons for you to take an active role in shortlisting jobs: Personal Expertise: No one understands the nuances of the jobs and roles you’re aiming for better than you. Your insights and preferences are invaluable in identifying the best opportunities. Improved Outcomes: Our experience shows that final outcomes are significantly better when you stay engaged and involved in the process. Rather than us randomly applying to hundreds of positions, your input ensures we target the most suitable roles. Avoiding Bias: For instance, on Day 10 of our collaboration, you might notice we’ve shortlisted roles on platforms like Greenhouse and Lever but seemingly neglected Workday and iCIMS. By staying involved, you can prevent any perceived biases and ensure a balanced approach. Geographic Limitations: LinkedIn often restricts the visibility of US job listings from Indian profiles, making your participation crucial in finding the best matches. Unique Requirements: Each client has distinct needs. For example, one client wanted SDE roles with a focus on JavaScript. We initially shortlisted Node.js roles, but the client specifically preferred React.js. Another client desired Product Manager positions based on location, industry, and posting date but was dissatisfied because some roles required more experience than they had. Given the diverse and specific nature of our clients’ needs, it’s clear that keeping you in the driver’s seat for job shortlisting is beneficial. That said, we also accommodate clients who prefer to delegate completely. Some clients share their LinkedIn credentials and set up job alerts, asking us to apply for all jobs that come through those alerts. In these instances, we are more than happy to handle the shortlisting. Otherwise, we recommend you take the lead.`,
    },
    {
      question: 'How long will my assistant take to apply for the shortlisted job?',
      answer: 'Typically, applications are submitted within the same day. It is uncommon for the process to take longer than 48 hours. If an application is not submitted within this timeframe, an escalation ticket is automatically generated.',
    },
    {
      question: 'How do I track my applications?',
      answer: 'You can visit the dashboard to monitor all your submitted applications and also have the option to import a CSV file.',
    },
    {
      question: 'How are you creating personalized Resumes?',
      answer: 'We follow a code and build policy for resumes, as research shows that coded resumes are more likely to pass through ATS and have higher chances of being shortlisted. We utilize AI tools to review resumes and offer unlimited revisions.',
    },
    {
      question: 'How are you creating personalized Cover Letters?',
      answer: 'We utilize AI to create customized cover letters by inputting the specific job description, roles, responsibilities, and your resume. This ensures the cover letter is highly personalized and targeted for the role. The quality of these generated cover letters has been remarkably high. You can try it out for free once you log in to our platform.',
    },
    {
      question: 'Who will review my Linkedin?',
      answer: 'Your LinkedIn profile will be reviewed by working professionals currently employed at major tech companies in the USA. They will provide direct feedback, and we can also arrange a call if needed.',
    },
    {
      question: 'Who are the assistants?',
      answer: 'Our assistants are college students and working professionals from top universities and small companies in India, working part-time. They are specifically trained to fill US job applications on behalf of clients. We select only the top 2% of applicants who wish to join us, and they undergo rigorous training and testing across multiple parameters and situations.',
    },
    {
      question: 'What if I am not happy with my assistant?',
      answer: 'You can request a new assistant at any time. We will assign a new assistant for you, allowing you to continue delegating tasks seamlessly.',
    },
    {
      question: 'Pricing looks expensive?',
      answer: 'We maintain a high success rate thanks to our rigorous screening process and the exceptional quality of candidates we accept into our program.',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
<section className="py-16 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-4xl mx-auto px-4">
    {/* Heading */}
    <h2
      className="text-4xl font-extrabold text-center text-gray-800 mb-6"
      style={{ fontFamily: 'Calibri, sans-serif' }}
    >
      Frequently Asked Questions
    </h2>
    <p
      className="text-center mb-8 text-gray-600 text-lg leading-relaxed"
      style={{ fontFamily: 'Calibri, sans-serif' }}
    >
      95% of questions are answered here. Can't find <br />
      what you're looking for? Feel free to reach out!
    </p>

    {/* Search Bar */}
    <div className="mb-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
          style={{ fontFamily: 'Calibri, sans-serif' }}
        />
      </div>
    </div>

    {/* FAQs List */}
    <div>
      {filteredFaqs.map((faq, index) => (
        <details
          key={index}
          className="group py-4 border-b border-gray-200"
        >
          <summary
            className="text-lg font-medium cursor-pointer bg-white p-4 rounded-lg shadow-md hover:bg-green-50 hover:shadow-lg transition duration-300 ease-in-out flex justify-between items-center"
            style={{
              fontFamily: 'Calibri, sans-serif',
              color: '#333',
            }}
          >
            <span>{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 group-open:rotate-180 transform transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 leading-relaxed text-sm text-gray-600">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>

  );
};

export default FAQSection;