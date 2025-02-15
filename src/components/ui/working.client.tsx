'use client';
import React, { SVGProps, useState } from 'react';
import Link from 'next/link';
// import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; // Adjust the path as necessary
import Marquee from 'react-fast-marquee';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const Working = () => {
  //   const { isSignedIn, user } = useUser();
  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(prev => !prev);
  // };

  return (
    <>
      <div
        className="min-h-screen text-black"
        style={{ backgroundColor: '#FAF6F6' }}
      >
        <Navbar />

        <>
          <section className="w-full py-8 md:py-20 lg:py-15 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-500 px-3 py-1 text-sm text-white shadow hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-gray-600">
                    How It Works
                  </div>

                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                    Your Job Search Journey
                  </h2>
                  <p className="max-w-[800px] mx-auto text-gray-500 md:text-xl lg:text-lg xl:text-xl dark:text-gray-400">
                    Find your dream job with our easy-to-use platform. Here's a
                    step-by-step guide to help you navigate the application
                    process and land the perfect position.
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 max-w-xs sm:max-w-4xl lg:max-w-5xl">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    1
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">
                      Create Account
                    </h3>
                    <p className="text-sm text-gray-800 dark:text-gray-400">
                      Begin your journey by create your account and find the
                      opportunities that match your skills and interests.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    2
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">
                      Complete Payment
                    </h3>
                    <p className="text-sm text-gray-800 dark:text-gray-400">
                      Secure Your Access: Finalize your registration by
                      completing your payment. This step ensures full access to
                      all the features and resources available, tailored to
                      enhance your job search and application process.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    3
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">
                      Build Profile
                    </h3>
                    <p className="text-sm text-gray-800 dark:text-gray-400">
                      Craft a comprehensive profile highlighting your skills,
                      experience, and aspirations. This is your opportunity to
                      stand out to potential employers and find matches that
                      resonate with your career goals.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    4
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">
                      Job Assistant
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Utilize our Job Assistant to effortlessly search and
                      filter opportunities that align with your expertise and
                      interests. This tool is designed to simplify your search
                      and connect you with your ideal job.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    5
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">Interviews</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      As your applications catch attention, prepare for
                      interviews with potential employers. Our platform will
                      notify you of interview requests and provide the necessary
                      details to ensure you’re fully prepared.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700 text-black">
                    6
                  </div>
                  <div className="grid gap-1 text-center">
                    <h3 className="text-lg font-bold text-black">
                      Get Prepared for Interview
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Leverage our comprehensive resources to ace your
                      interviews. From tips on answering common questions to
                      advice on making a lasting impression, we’ve got you
                      covered to ensure you’re prepared and confident.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
      <Footer />
    </>
  );
};
export default Working;
