'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const sectionsData = [
  {
    title: '90+ ATS Score',
    subtitle: 'Build your resume with AI',
    description:
      'Our AI resume builder gives students over 70% ATS scores, prepping them for job-specific roles.',
    bgColor: '#4338CA',
    image:
      'resume.png',
  },
  {
    title: '80x',
    subtitle: 'Less time spent doubting yourself',
    description:
      'Students achieve remarkable feedback, through our strategic AI feedback model, which gives complete information and evaluation of their profile, resulting in 80% less time spent doubting themselves.',
    bgColor: '#2563EB',
    image:
      'catbot.png',
  },
];

const AnimatedButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.button
      className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-full overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
      <span className="relative">{children}</span>
    </motion.button>
  );
};

const Section = ({
  data,
  index,
}: {
  data: (typeof sectionsData)[0];
  index: number;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ['blur(20px)', 'blur(0px)', 'blur(0px)']
  );

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      index === 0 ? data.bgColor : sectionsData[index - 1].bgColor,
      data.bgColor,
      index === sectionsData.length - 1
        ? data.bgColor
        : sectionsData[index + 1].bgColor,
    ]
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-[80vh] relative flex items-center overflow-hidden"
    >
      <motion.div
        className={`absolute top-0 right-0 h-full w-[35%] ${
          index === 0 ? 'rounded-tl-[200px]' : ''
        } ${
          index === sectionsData.length - 1 ? 'rounded-bl-[200px]' : ''
        }`}
        style={{ backgroundColor }}
        transition={{ duration: 0.5 }}
      />
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 relative z-10">
        <div className="lg:w-1/2 space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block px-4 py-2 text-base font-bold text-gray bg-gradient-to-r from-gray-100 to-gray-500 rounded-lg shadow-lg"
          >
            {data.subtitle}
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            {data.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="https://apply.neetocal.com/meeting-with-nikhil-jain">
              <button className="relative flex items-center justify-center gap-2 px-4 py-1.5 text-sm md:text-base font-medium text-primary-foreground bg-white rounded-full hover:bg-gray-100 transition-all shadow-md border border-gray-300 w-full md:w-auto mt-8">

                <span  className='text-black'>Try it for free</span>
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
                <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full animate-ping"></span>
                <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full"></span>
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="lg:w-1/3 relative flex justify-end"
          style={{ x, opacity, filter }}
        >
          <BackgroundGradient className="rounded-2xl p-4 bg-white dark:bg-zinc-900 shadow-lg">
            <div className="w-[560px] h-[315px]">
              <img
                src={data.image}
                className="rounded-lg border-0 outline-none"
              />
              <p className="sr-only">{`${data.subtitle} Interface`}</p>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>
    </div>
  );
};

export default function ScrollAnimatedSections() {
  return (
    <div className="relative">
      {sectionsData.map((data, index) => (
        <Section key={index} data={data} index={index} />
      ))}
    </div>
  );
}
