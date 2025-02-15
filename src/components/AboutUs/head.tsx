"use client"
import React from "react";

export default function Head() {
  return (
    <div className="relative text-center mt-8 mb-8">
      <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Trusted by Thousands of Job Seekers
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Empowering your career with tailored job applications and expert guidance.
      </p>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
    </div>
  );
}
