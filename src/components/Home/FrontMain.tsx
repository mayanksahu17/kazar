'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  Search,
  FileText,
  Award,
  Users,
  Laptop,
  Coffee,
  BarChart,
  Mail,
  ChevronRight,
} from 'lucide-react';


const FloatingElement = ({
  icon: Icon,
  className,
  size = 24,
}: {
  icon: React.ElementType;
  className?: string;
  size?: number;
}) => {
  return (
    <motion.div
      className={`absolute text-gray-400/50 ${className}`}
      animate={{
        y: [0, -10, 0],
        x: [0, 5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-black overflow-x-hidden">
      <div className="container px-4 mx-auto mt-16 md:mt-32">
        {/* Hero Section */}
        <section className="relative flex flex-col justify-center items-center text-center min-h-[90vh]">
          {/* Background floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingElement
              icon={Briefcase}
              className="top-[10%] left-[10%]"
              size={32}
            />
            <FloatingElement
              icon={Search}
              className="top-[25%] left-[5%]"
              size={28}
            />
            <FloatingElement
              icon={FileText}
              className="bottom-[25%] left-[15%]"
              size={36}
            />
            <FloatingElement
              icon={Award}
              className="top-[20%] right-[10%]"
              size={40}
            />
            <FloatingElement
              icon={Users}
              className="top-[33%] right-[5%]"
              size={32}
            />
            <FloatingElement
              icon={Laptop}
              className="bottom-[33%] right-[15%]"
              size={36}
            />
            <FloatingElement
              icon={Coffee}
              className="bottom-[20%] left-[20%]"
              size={28}
            />
            <FloatingElement
              icon={BarChart}
              className="top-[50%] left-[25%]"
              size={32}
            />
            <FloatingElement
              icon={Mail}
              className="bottom-[50%] right-[20%]"
              size={36}
            />
          </div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <div className="flex flex-col justify-center items-center text-center mt-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-[1.1]"
              >
                Close the Gap<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                   One step at a time
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 mb-12"
              >
                Skill Bridge guides you to top opportunities by showcasing your project-based achievements,
                helping you stand out and succeed in the job market."
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-full hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 group"
                >
                  Know more about us!
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
    
              </motion.div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
              {/* Job Seekers Helped */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full shadow-sm">
              <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-gray-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6s-2.5 1.12-2.5 2.5S10.62 11 12 11zM7 13h10a3 3 0 013 3v1H4v-1a3 3 0 013-3z"
  />
  <rect x="3" y="17" width="18" height="2" rx="1" ry="1" />
</svg>

                
              </div>

              {/* Trustpilot Rating */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full shadow-sm"> 
              </div>
  
            </div>
          </motion.div>

          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-4xl mx-auto mt-16 lg:mt-0 lg:ml-auto"
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
        <div
  className=" relative w-[90vw]  h-auto ml-10 md:ml-0   md:h-[70vh] flex items-center justify-center overflow-hidden bg-white mt-8"
  style={{
    transform:
      'perspective(1000px) rotateX(5deg) rotateY(5deg) rotateZ(-10deg) skewX(10deg)',
    transformOrigin: 'center bottom',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
    maskImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
  }}
>
  {/* Window controls */}
  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100/80 backdrop-blur flex items-center gap-1.5 px-4 z-10">
    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
  </div>

  <Image
    src="/herobanner.jpeg"
    alt="Application Interface"
    width={1920} // Desktop width
    height={1080} // Desktop height
    className="w-4/5 h-auto object-cover md:object-contain"
  />
</div>




              {/* Subtle gradient background */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-20 blur-3xl" />
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 py-20"
        >
          {/* <Testimonials /> */}
        </motion.div>
      </div>
    </div>
  );
}