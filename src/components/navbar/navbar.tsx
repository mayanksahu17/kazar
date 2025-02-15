'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically importing modal and other components
const Model = dynamic(() => import('../GetInTouch/Model'), { ssr: false });
const Help = dynamic(() => import('../GetInTouch/Help'), { ssr: false });

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} passHref>
    <span className="text-sm font-medium text-gray-700 hover:text-green-500 cursor-pointer">
      {children}
    </span>
  </Link>
);

const Navbar = () => {
  // const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTalkToUsVisible, setIsTalkToUsVisible] = useState(true); // State to control visibility of "Talk to Us"
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
        setIsTalkToUsVisible(false); // Hide "Talk to Us" section on scroll down
      } else if (scrollTop < lastScrollTop || scrollTop < 50) {
        setIsTalkToUsVisible(true); // Show "Talk to Us" section on scroll up
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const handleTalkToUsClick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] mt-4">
      <div className="max-w-5xl mx-auto px-4">
        {/* Navbar */}
        <div
          className={`flex items-center justify-between py-2 px-4 bg-green-100/90 border border-gray-200 rounded-full shadow-md backdrop-blur-sm ${
            isMenuOpen ? 'z-[200]' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/">
            <img
              alt="skill bridge"
              className="absolute h-8 w-auto rounded-lg cursor-pointer transition-transform duration-200 hover:scale-110"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              src="/assets/Images/skill-bridge-logo.png"
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/Job-Data" passHref>
              <span className="text-sm font-medium bg-green-600 text-white py-1.5 px-4 rounded-full hover:bg-green-700 cursor-pointer transition-colors duration-200">
                LeaderBoard
              </span>
            </Link>
            <Link href={'/sign-up'}>sign up</Link>
            <Link href={'/sign-in'}>sign in</Link>
          </nav>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* {user ? (
              <>
                <Link href="/dashboard" passHref>
                  <span className="text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-green-500 rounded-md py-1.5 px-4 cursor-pointer shadow-sm hover:shadow transition-all duration-150 ease-in-out transform hover:-translate-y-0.5">
                    Dashboard
                  </span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <NavLink href="/sign-in">Login</NavLink>
                <NavLink href="/sign-up">Sign Up</NavLink>
              </>
            )} */}
          </div>
        </div>

        {/* "Ready to Get a Job?" Section */}
        {isTalkToUsVisible && (
          <div
            className={`mt-2 px-4 py-2 bg-transparent text-black font-bold text-center z-[50] ${
              isMenuOpen ? 'pointer-events-none' : ''
            }`}
          >
            <p className="text-base animate-bounce">
              Ready to Build?{' '}
              <a
                href="#"
                onClick={handleTalkToUsClick}
                className="text-blue-300 font-extrabold underline hover:text-blue-400 transition duration-300 ease-in-out"
              >
                Enroll Now!
              </a>
            </p>
          </div>
        )}

        {/* Background Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[150]"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-green-100/90 border border-gray-200 rounded-lg shadow-lg p-4 backdrop-blur-sm z-[200] relative">
            <nav className="flex flex-col space-y-4">
  

              <Link href="/" passHref>
                <span className="text-sm font-medium bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 cursor-pointer transition-colors duration-200 text-center block">
                  LeaderBoard
                </span>
              </Link>
              {/* {user ? (
                <>
                  <Link href="/dashboard" passHref>
                    <span className="text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-green-500 rounded-md py-2 px-4 cursor-pointer shadow-sm hover:shadow transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 text-center block">
                      Dashboard
                    </span>
                  </Link>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <>
                  <NavLink href="/sign-in">Login</NavLink>
                  <NavLink href="/sign-up">Sign Up</NavLink>
                </>
              )} */}
            </nav>
          </div>
        )}
      </div>

      {/* Modal Form (Talk to Us) */}
      <Model show={showForm} onClose={handleClose}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col justify-center items-center p-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-4 text-center">
              Schedule a Call With Founders
            </h2>
            <Link
              href="https://apply.neetocal.com/meeting-with-nikhil-jain"
              target="_blank"
            >
              <button className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary-dark transition-all shadow-lg border">
                <span className="rounded-full bg-white p-2">
                  <img
                    src="Nikhil.jpeg"
                    alt="Nikhil Jain"
                    className="h-6 w-6"
                    loading="lazy"
                  />
                </span>
                <span>Schedule a call</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:ml-1 h-5 w-5 text-gray-400 animate-pulse"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </Link>
            <p className="mt-4 text-sm md:text-lg text-center text-gray-600">
              Schedule a personal call with our founders
            </p>
          </div>
          <Help />
        </div>
      </Model>
    </header>
  );
};

export default Navbar;
