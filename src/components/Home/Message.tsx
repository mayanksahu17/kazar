import Link from 'next/link';
import React, { useState } from 'react';
import ScheduleCallButton from '../buttons/schedule-call'; // Import the reusable component

const Message = () => {
  return (
<section className="bg-transparent py-8 mt-10">
  <div className="max-w-3xl mx-auto px-10 text-justify bg-white shadow-2xl rounded-xl p-12 bg-gradient-to-r from-white via-gray-100 to-gray-200 border border-gray-300 relative">
    <h2
      className="text-3xl font-bold mb-8 text-gray-800"
      style={{ fontFamily: 'Calibri, sans-serif' }}
    >
      Dear Fellow Job Seeker,
    </h2>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      Job searching has become one of the most stressful phases of our lives, especially for those
      of us who graduated without a job offer or were laid off due to circumstances beyond our
      control. The uncertainty of landing a job can take a toll on our mental health and confidence.
    </p>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      Engaging in extensive networking and submitting applications to countless jobs has become the
      norm. The most frustrating aspect is repeatedly inputting the same information into lengthy
      applications, only to receive no response. This lack of feedback can be incredibly disheartening,
      making it difficult to maintain motivation and focus.
    </p>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      Unfortunately, this is the reality we face, and it seems unavoidable. While we cannot change
      the system, we can find ways to navigate it more effectively. After exhausting traditional
      approaches like auto-fill extensions and job boards, I realized I needed a smarter and more
      personalized approach.
    </p>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      That’s when I decided to delegate this tedious task. I hired a college student from India to
      apply for jobs on my behalf. This allowed me to focus on preparing for interviews and honing
      my skills. Within 60 days, I landed my dream job, and this experience changed my perspective.
    </p>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      This success inspired me to create a service that could help others. We founded HireEasy with
      a mission to alleviate the stress of job searching by providing dedicated human support to
      job seekers like you. Our team ensures that your applications are submitted to the right jobs,
      giving you the best chance at landing interviews.
    </p>

    <p
      className="text-gray-700 mb-6 text-lg"
      style={{
        fontFamily: 'Calibri, sans-serif',
        lineHeight: '1.8',
      }}
    >
      At HireEasy, we understand the challenges international students and job seekers face in
      navigating the competitive job market. Our approach combines efficiency, personalization,
      and care to ensure you can focus on what truly matters—preparing for your next big career
      opportunity.
    </p>

    <div className="flex items-center mb-8">
      <div className="w-24 h-24 border border-gray-300 rounded-lg mr-4 overflow-hidden">
        <img
          src="Shubham.png"
          alt="Shubham Jain"
          className="w-full h-full transform scale-100 object-cover"
        />
      </div>

      <div>
        <p
          className="text-gray-800 font-bold"
          style={{ fontFamily: 'Calibri' }}
        >
          Shubham Jain
        </p>
        <p
          className="text-gray-600"
          style={{ fontFamily: 'Calibri, sans-serif' }}
        >
          Co-Founder | Operations | Ex - Amazon
        </p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-4 mt-10 items-center justify-center">
      <Link href="/onboarding">
        <button className="relative flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg font-medium text-black bg-white rounded-full hover:bg-green-50 transition-all shadow-lg border border-gray-300 w-full md:w-auto animate-shimmer bg-[linear-gradient(110deg,#d2f8e3,45%,#b6e7d9,55%,#d2f8e3)] bg-[length:200%_100%] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Schedule 3 days free trial
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5-5 5m0-5H6"
            ></path>
          </svg>
        </button>
      </Link>

      {/* Use the reusable ScheduleCallButton component here */}
      <ScheduleCallButton />
    </div>
  </div>
</section>

  );
};

export default Message;
