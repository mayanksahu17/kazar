'use client';

import { FloatingIcons } from './floating-icon';
import { JobCard } from './job-card';
import Marquee from "react-fast-marquee";

const jobCategories = [
  {
    title: 'Solve Questions for top companies',
    companies: [
      { logo: '/float/google.png', name: 'Google' },
      { logo: '/float/meta.png', name: 'Meta' },
      { logo: '/float/amazon.png', name: 'Amazon' },
    ],
    cardLogo: '/Hiredeasy.png',
  },
  {
    title: 'Real World Startup Projects',
    companies: [
      { logo: '/float/netflix.png', name: 'Netflix' },
      { logo: '/float/spotify.png', name: 'Spotify' },
      { logo: '/float/apple.png', name: 'Apple' },
    ],
    cardLogo: '/Hiredeasy.png',
  },
  {
    title: 'Internships at Unicorn Startups',
    companies: [
      { logo: '/float/stripe.png', name: 'Stripe' },
      { logo: '/float/notion.png', name: 'Notion' },
      { logo: '/float/vercel.png', name: 'Vercel' },
    ],
    cardLogo: '/Hiredeasy.png',
  },
];

function HeroSection() {
  return (
    <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-12 lg:mb-24 space-y-4 sm:space-y-6 lg:space-y-8"> {/* Adjust margin-bottom for mobile */}
      <h1 className="space-y-1 sm:space-y-2 lg:space-y-3 text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900">
        <div>We're here for</div>
        <div>
          <span className="relative inline-block">
            every step
            <svg
              className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-0 w-full h-1 sm:h-2 lg:h-3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 242 6"
            >
              <path
                d="M4.10469 3.70282C9.9443 3.017 42.5812 1.44003 69.3237 0.550646C102.418 -0.549285 209.303 0.112961 226.986 1.52828C249.064 3.29481 246.738 4.59483 220.374 5.22212C175.88 6.28186 -0.00182429 6.24952 0 5.18191C0 4.63413 1.84802 3.96841 4.10469 3.70282Z"
                fill="#3EC0DD"
              />
            </svg>
          </span>{' '}
          of your career.
        </div>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
        Make yourself industry-ready with real-world project experience and stand out to get hired by top companies..
      </p>
    </div>
  );
}


function LeftContent() {
  return (
    <div className="space-y-8 sm:space-y-12 w-full max-w-[340px] sm:max-w-xl mx-auto lg:mx-0">
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 bg-green-50 rounded-full px-3 py-1 border border-blue-600 shadow-sm">
          <span className="text-xs sm:text-sm font-medium text-blue-600">
            Student Success Rate
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 relative">
          <span className="relative inline-block">
            75% Increase
            <svg
              className="absolute -bottom-5 left-0 w-full h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 10"
            >
              <path
                d="M4.10469 5.70282C10.9443 4.017 50.5812 2.44003 80.3237 1.55065C110.418 0.450715 120.303 0.812961 136.986 2.52828C150.064 4.29481 148.738 5.59483 130.374 6.22212C100.88 7.28186 0.00182429 7.24952 4.10469 5.70282Z"
                fill="#3EC0DD"
              />
            </svg>
          </span>
          <br />
          <span className="text-gray-800 block mt-2">
            {' '}
            in Placements with SkillBridge
          </span>
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-lg">
          90% of students land interviews within 3 months and 70% secure offers within 6 months.
        </p>
        <div className="flex items-center space-x-2">
          <span className="relative inline-block text-4xl">
            70%
            <svg
              className="absolute -bottom-5 left-0 w-full h-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 10"
            >
              <path
                d="M4.10469 5.70282C10.9443 4.017 50.5812 2.44003 80.3237 1.55065C110.418 0.450715 120.303 0.812961 136.986 2.52828C150.064 4.29481 148.738 5.59483 130.374 6.22212C100.88 7.28186 0.00182429 7.24952 4.10469 5.70282Z"
                fill="#3EC0DD"
              />
            </svg>
          </span>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            students get hired seamlessly with SkillBridge.
          </p>
        </div>
      </div>
    </div>
  );
}

function JobMatches() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-xl lg:max-w-2xl mx-auto lg:ml-auto">
      <div className="absolute inset-0 rounded-2xl bg-gray-50/80 backdrop-blur-sm shadow-xl" />
      <div className="relative p-3 sm:p-4 lg:p-6">
        <FloatingIcons />
        <div className="overflow-hidden">
          {' '}
          {/* Reduced mt-4 to mt-2 */}
          <div className="relative flex items-center justify-center mb-4">
            <h2 className="text-xs sm:text-base font-medium text-gray-500 relative">
              <span className="relative z-10">Get hired into top companies with personalized projects</span>
            </h2>
          </div>
          <Marquee gradient={false} speed={20} className="overflow-hidden">
            <div className="flex">
              {jobCategories.map((category, index) => (
                <div
                  key={`${category.title}-${index}`}
                  className="flex-shrink-0 px-1.5"
                >
                  <JobCard
                    title={category.title}
                    companies={category.companies}
                    cardLogo={category.cardLogo}
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              {jobCategories.map((category, index) => (
                <div
                  key={`${category.title}-repeat-${index}`}
                  className="flex-shrink-0 px-1.5"
                >
                  <JobCard
                    title={category.title}
                    companies={category.companies}
                    cardLogo={category.cardLogo}
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default function JobMatcher() {
  return (
    <section className="min-h-screen w-full bg-transparent">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        <HeroSection />
        <div className="grid gap-2 lg:grid-cols-2 sm:gap-2 lg:gap-6 items-center"> {/* Adjust gap only for mobile */}
          <LeftContent />
          <JobMatches />
        </div>
      </div>
    </section>
  );
}
