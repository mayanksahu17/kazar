"use client"

import Link from "next/link"
import { Star } from 'lucide-react'
import { AnimatedTooltip } from "../ui/animated-tooltip"

const people = [
  {
    id: 1,
    name: "Anjali Singh",
    designation: "Senior at KIIT",
    image:
      "/Anjali.png",
  },
  {
    id: 2,
    name: "Radhika Gupta",
    designation: "Freshman at IIT Indore",
    image:
      "/Radhika.png",
  },
  {
    id: 3,
    name: "Aradhy Agrawal",
    designation: "Senior at SVVV",
    image:
      "/Siddharth.png",
  },
  {
    id: 4,
    name: "Kuldeep Vyas",
    designation: "Senior at KIIT",
    image:
      "/Kuldeep.jpeg",
  },
  {
    id: 5,
    name: "Yash Jaiswal",
    designation: "Junior at IIT Indore",
    image:
      "/Anil.jpg",
  },
  {
    id: 6,
    name: "Deepesh Gupta",
    designation: "Sophomore at Jawaharlal Nehru University",
    image:
      "/Depeesh.png",
  },
]

export default function MarketingSection() {
  return (
    <div className="bg-black text-white min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <div className="space-y-8 flex-1">
            {/* Heading Section */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Get started today with Us
              </h1>
              <p className="text-gray-400 text-lg">
              HiredEasy offers the best-in-class job opportunities to jumpstart your career. Join 27+ other professionals to get started!
              </p>
            </div>

            {/* Social Proof Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="flex flex-row items-center w-auto sm:w-auto">
                  <AnimatedTooltip items={people} />
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-center sm:text-left">
                Trusted by 1,000+ students
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex w-full md:w-auto justify-center md:justify-end md:mt-0">
            <Link 
              href="https://apply.neetocal.com/meeting-with-nikhil-jain"
              className="inline-block bg-[#40E0D0] hover:bg-[#3CC8BA] text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Book a demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
