"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Testimonials from "./review";
import { LRUCache } from "lru-cache"; // Correct import for LRUCache

interface Testimonial {
  _id: string;
  client_name: string;
  position_at_company_and_location: string;
  company_profile: string;
  linkedin_url: string;
  profile_image_url: string;
  description: string;
}

// Initialize LRU Cache
const cache = new LRUCache<string, Testimonial[]>({
  max: 5, // Store up to 5 items in cache
  ttl: 60 * 1000, // Cache expiry: 1 minute
});

export default function PremiumWallOfLove() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Check LRU Cache
        const cachedData = cache.get("testimonials");
        if (cachedData) {
          console.log("Serving from LRU cache");
          setTestimonials(cachedData);
          setIsLoading(false);
          return;
        }

        console.log("Fetching from API...");
        setIsLoading(true);
        const response = await fetch("/api/testimonials");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Testimonial[] = await response.json();
        setTestimonials(data);

        // Save data to LRU Cache
        cache.set("testimonials", data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-6 sm:pt-8 md:pt-12">
      <Navbar />
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl mt-12 pt-5 sm:text-4xl md:text-5xl font-bold text-gray-800 ">
          Our clients <span className="text-red-500">❤️</span> us
        </h1>
        <p className="text-gray-600 mt-4 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Discover how HiredEasy has transformed careers and opened doors to new opportunities
          for professionals across various industries.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 px-4 sm:px-8">
        {isLoading && !testimonials.length && (
          <div className="col-span-full text-center text-gray-500">Loading testimonials...</div>
        )}

        {!isLoading && testimonials.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No testimonials found.</div>
        )}

        {testimonials.map((testimonial) => (
          <Card
            key={testimonial._id}
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
<CardHeader className="p-4 bg-green-50 border-b border-green-100">
  <div className="flex items-center justify-between">
    {/* Left Section: Profile Image, Name, and Role */}
    <div className="flex items-center flex-grow space-x-3 w-1/2">
      <img
        src={testimonial.profile_image_url}
        alt={testimonial.client_name}
        className="w-12 h-12 rounded-full border border-green-200"
      />
      <div className="overflow-hidden">
        {/* Name */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="text-sm font-medium text-gray-900 truncate w-full">
              {testimonial.client_name}
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  {testimonial.client_name}
                </h4>
                <p className="text-sm">{testimonial.position_at_company_and_location}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {/* Role */}
        <p className="text-xs text-gray-600 truncate w-full">
          {testimonial.position_at_company_and_location}
        </p>
      </div>
    </div>

    {/* Right Section: Company Logo */}
    <div className="flex items-center justify-end w-1/2">
      <a
        href={testimonial.linkedin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-600 transition-colors duration-200 mx-2"
      >
        <LinkedInLogoIcon className="w-5 h-5" />
      </a>
      <img
        src={testimonial.company_profile}
        alt="Company Logo"
        className="h-12 w-auto object-contain max-w-[50%] md:max-w-[80px]" // Fixing the size
      />
    </div>
  </div>
</CardHeader>

            <CardContent className="p-4">
              <ScrollArea className="h-48 pr-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {testimonial.description}
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Section */}
      <Testimonials />
      <Footer />
    </div>
  );
}
