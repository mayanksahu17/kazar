"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Music, Briefcase, GraduationCap } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Card } from "@/components/ui/card";

interface TimelineEntry {
  title?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  animationSpeed?: number;
  alignRight?: boolean;
}

export const Timeline = ({
  data,
  animationSpeed = 1,
  alignRight = false,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 0.9]
  );

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.1 / animationSpeed],
    [0, 1]
  );

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              alignRight ? "justify-end" : "justify-start"
            } mb-16 relative`}
          >
            <div className="sticky top-1/2 z-40 self-start -translate-y-1/2">
              <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
            </div>
            <div className={`${alignRight ? "pr-8" : "pl-8"} w-full`}>
              {item.title && (
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-500 dark:text-neutral-500 mb-4">
                  {item.title}
                </h3>
              )}
              <div>{item.content}</div>
            </div>
          </div>
        ))}
        {/* Base Line */}
        <div className="absolute left-5 top-0 h-full w-[2px] bg-neutral-200 dark:bg-neutral-800" />
        {/* Animated Gradient */}
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className={`absolute ${
            alignRight ? "right-5" : "left-5"
          } top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full`}
        />
      </div>
    </div>
  );
};