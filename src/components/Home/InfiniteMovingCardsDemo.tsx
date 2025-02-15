"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import  Head from '../AboutUs/head';

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[3] py-11 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Head/>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
    {
      quote:
        "HiredEasy made my job application process seamless. Within weeks, I started receiving multiple interview calls. The personalized support they provide is unmatched!",
      name: "Ananya Sharma",
      title: "University of Southern California",
    },
    {
      quote:
        "As an international student, I struggled to navigate the job market in the USA. HiredEasy not only helped me apply for jobs but also prepared me for interviews. I secured my dream job in less than a month!",
      name: "Ravi Patel",
      title: "Arizona State University",
    },
    {
      quote:
        "The attention to detail and tailored approach by HiredEasy gave me an edge over others. I couldn't have managed to apply to so many companies without their support.",
      name: "Li Wei",
      title: "Boston University",
    },
    {
      quote:
        "I was overwhelmed with the job application process, but HiredEasy handled everything. They saved me so much time and helped me land a role at a top company!",
      name: "Fatima Khan",
      title: "University of Florida",
    },
    {
      quote:
        "HiredEasy was a game-changer for me. They took care of all the applications while I focused on my studies and interviews. I would highly recommend their services to anyone!",
      name: "Pedro Fernandez",
      title: "Texas A&M University",
    },
    {
      quote:
        "Thanks to HiredEasy, I received interview calls from some of the best companies in the USA. Their services are professional and highly effective for international students.",
      name: "Sara Mahmood",
      title: "Northeastern University",
    },
];