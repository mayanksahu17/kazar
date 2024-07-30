import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-500">About Our BGMI Tournament Platform</h1>
          <p className="mt-4 text-xl text-gray-300">
            Welcome to the ultimate destination for competitive Battlegrounds Mobile India (BGMI) tournaments!
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Who We Are</h2>
            <p className="mt-2 text-gray-300">
              We are a passionate group of gamers and developers dedicated to bringing the best BGMI tournament experience to players of all skill levels. Our platform is designed to be user-friendly, competitive, and rewarding, ensuring that every match is an unforgettable experience.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">What We Offer</h2>
            <p className="mt-2 text-gray-300">
              Our platform offers a variety of tournaments, from daily quick matches to monthly mega tournaments with big prizes. Whether you are a solo player or part of a team, there’s a tournament for you. We also provide real-time stats, leaderboards, and a community forum where players can connect and share strategies.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Why Choose Us</h2>
            <p className="mt-2 text-gray-300">
              Our commitment to fairness and transparency sets us apart. We use advanced anti-cheat systems to ensure a level playing field and have a dedicated support team ready to assist you with any issues. Our platform is continually updated with new features and improvements based on community feedback.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Join Us</h2>
            <p className="mt-2 text-gray-300">
              Ready to show off your skills and compete with the best? Join our community today and take your BGMI experience to the next level. Sign up, join a tournament, and let the games begin!
            </p>
          </section>
          <div className="text-center">
            <Link href="/sign-up" passHref>
              <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                Sign Up Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
