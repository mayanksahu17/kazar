import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ALL_LOGOS = [
  'CalState.jpeg',
  'UF.png',
  'BostonUniversity.gif',
  'USSA.png',
  'RIT.png',
  'ASU.png',
  'Bridgeport.png',
  'Clarksonlogo.png',
  'Auburn.png',
  'StevensLogo.png',
  'TexasLogo.png',
  'DrexelLogo.png',
  'OSU.png',
  'NortheasternLogo.png',
  'KentState.png',
  'Pacelogo.png',
  'SJSU.png',
  'SU.png',
  'UB.png',
  'UH.png',
  'UO.png',
  'USF.png',
  'USC.png',
  'UTD.png',
  'CSU.webp',
  'UTK.webp',
  'UU.jpg'
];

const CONTENT_VARIATIONS = [
  {
    gradientColor: 'from-gray-500 to-purple-500',
    title: 'HiredEasy Impact',
    stats: [
      {
        number: '600+',
        text: 'Job seekers supported in landing dream roles',
        icon: '💼', // Add an icon for a visual touch
      },
      {
        number: '70%',
        text: 'Success rate for interview calls within a month',
        icon: '📞',
      },
      {
        number: '1,000+',
        text: 'Mock interviews conducted',
        icon: '🎯',
      },
      {
        number: '24/7',
        text: 'Dedicated support for job seekers',
        icon: '⏰',
      },
    ],
    products: ['Resume Optimization', 'Mock Interviews', 'Job Applications'],
  },
  {
    gradientColor: 'from-green-500 to-teal-500',
    title: 'HiredEasy Reach',
    stats: [
      {
        number: '500+',
        text: 'Successful collaborations with top companies',
        icon: '🤝',
      },
      {
        number: '250k+',
        text: 'Applications submitted on behalf of users',
        icon: '📄',
      },
      {
        number: '3,000+',
        text: 'Tailored resumes created',
        icon: '✍️',
      },
      {
        number: '100+',
        text: 'Corporate partners and connections',
        icon: '🌐',
      },
    ],
    products: ['Personalized Job Matching', 'Interview Prep'],
  },
  {
    gradientColor: 'from-purple-500 to-pink-500',
    title: 'HiredEasy Growth',
    stats: [
      {
        number: '1200+',
        text: 'Clients assisted',
        icon: '🏢',
      },
      {
        number: '1,000+',
        text: 'Career consultations completed',
        icon: '👩‍🏫',
      },
      {
        number: '400+',
        text: 'Recruiter Connects',
        icon: '🌍',
      },
      {
        number: '4.9/5',
        text: 'Average user rating',
        icon: '⭐',
      },
    ],
    products: ['AI-Powered Tools', 'Human-Led Assistance'],
  },
];

export default function EnterpriseSection() {
  const [logos, setLogos] = useState<string[]>([]);
  const [contentIndex, setContentIndex] = useState(0);

  useEffect(() => {
    setLogos(getUniqueRandomLogos(15, ALL_LOGOS));
  }, []);

  function getUniqueRandomLogos(
    count: number,
    availableLogos: string[]
  ): string[] {
    const shuffled = [...availableLogos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  function swapLogosInGrid() {
    setLogos((prevLogos) => {
      const remainingLogos = ALL_LOGOS.filter(
        (logo) => !prevLogos.includes(logo)
      );
      const newLogos = [...prevLogos];

      const swapIndices = [];
      while (swapIndices.length < 3) {
        // Ensure exactly 3 unique swaps
        const randomIndex = Math.floor(Math.random() * newLogos.length);
        if (!swapIndices.includes(randomIndex)) {
          swapIndices.push(randomIndex);
        }
      }

      swapIndices.forEach((index) => {
        if (remainingLogos.length > 0) {
          const newLogoIndex = Math.floor(
            Math.random() * remainingLogos.length
          );
          const newLogo = remainingLogos.splice(newLogoIndex, 1)[0];
          newLogos[index] = newLogo;
        }
      });

      return newLogos;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % CONTENT_VARIATIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(swapLogosInGrid, 800);
    return () => clearInterval(interval);
  }, []);

  const currentContent = CONTENT_VARIATIONS[contentIndex];

  return (
    <div className="container mx-auto px-20">
      <div className="mb-12">
        <div className="inline-block bg-gray-100 border border-gray-300 px-2 py-1 rounded-md shadow-sm">
          <span className="text-sm text-gray-600 font-semibold">
            Save 100+ hours of grunt work
          </span>
        </div>

        <h2 className="text-4xl font-bold mt-2">
          Let another Human Do All Your Work
        </h2>
        <p className="text-gray-600 text-lg mt-4 max-w-3xl">
          HireEasy provides dedicated human assistants to apply for jobs on your
          behalf. With our service, you can save time and focus on interview
          preparation while we handle the tedious application process for you.
        </p>
        <button className="relative flex items-center justify-center gap-2 px-4 py-1.5 text-sm md:text-base font-medium text-primary-foreground bg-white rounded-full hover:bg-gray-100 transition-all shadow-md border border-gray-300 w-full md:w-auto mt-8">
          <span className="rounded-full bg-white p-1.5">
            <img
              src="Ashwin_jain.png"
              alt="Custom Image"
              className="h-5 w-5 rounded-full"
              loading="lazy"
            />
          </span>
          <span>Start Your Free Trial</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:ml-1 h-4 w-4 text-gray-400"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-2 h-4 w-4 text-gray-400"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full"></span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Metrics Section */}
        <div className="lg:w-[30%] space-y-6 flex-shrink-0 mb-6 lg:mb-0">
          <motion.div
            key={contentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3
              className="text-4xl font-semibold text-teal-500"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              {currentContent.title}
            </h3>

            <div className="grid gap-4">
              {currentContent.stats.map((stat, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-1 h-12 bg-gradient-to-b ${currentContent.gradientColor} self-stretch`}
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {stat.number}
                    </h4>
                    <p className="text-gray-600">{stat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Logos Section */}
        <div className="lg:w-[70%] bg-transparent rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {logos.map((logo, index) => (
              <motion.div
                key={logo + index}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.8, 1.05, 1], opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                  times: [0, 0.3, 0.7, 1],
                }}
                className="bg-white p-4 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  width: '120px',
                  height: '120px',
                }}
              >
                <Image
                  src={`/${logo}`}
                  alt={`Logo ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-contain max-w-full max-h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
