"use client"

import { ParallaxScroll } from "../ui/parallax-scroll"

const image = "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"

const profiles = [
  {
    name: "Mohit P.",
    role: "NLP Engineer",
    image: image
  },
  {
    name: "Ishita J.",
    role: "Product Manager",
    image: image
  },
  {
    name: "Laura T.",
    role: "Software Engineer",
    image: image
  },
  {
    name: "John D.",
    role: "Software Engineer",
    image: image
  },
  {
    name: "Bhavan G.",
    role: "UX Designer",
    image: image
  },
  {
    name: "Gagan P.",
    role: "Data Scientist",
    image: image
  },
  {
    name: "Arijit Y.",
    role: "Backend Developer",
    image: image
  },
  {
    name: "Ayesha K.",
    role: "Network Administrator",
    image: image
  },
  {
    name: "Ashish V.",
    role: "Frontend Developer",
    image: image
  },
  {
    name: "Amit N.",
    role: "QA Engineer",
    image: image
  },
]

export default function ParallaxBanner() {
  return (
    <div className="relative w-full min-h-[600px] overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full">
        <ParallaxScroll 
          images={profiles.map(profile => profile.image)}
          className="opacity-70"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold text-black bg-white/80 p-4 rounded-lg inline-block">
            We've helped 600+ fellows of all sorts of backgrounds land great jobs
          </h2>

          {/* Salary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <p className="text-3xl font-bold text-black">$83,307</p>
              <p className="text-gray-600">avg junior base salary</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <p className="text-3xl font-bold text-black">$134,973</p>
              <p className="text-gray-600">avg mid-level base salary</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <p className="text-3xl font-bold text-black">$199,896</p>
              <p className="text-gray-600">avg senior base salary</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
    </div>
  )
}
