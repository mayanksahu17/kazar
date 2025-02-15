import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Card } from '@/components/ui/card';
import { FileText, Music, Briefcase, GraduationCap } from 'lucide-react';

export default function CombinedSection() {
  const journeyData = [
    {
      title: 'Cost',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal">
            You're paying us $0.05/hour
          </p>
        </div>
      ),
    },
    {
      title: 'Interview Performance',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal mb-3">
            Increase in interviews 5x
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal">
            Advantage in interviews 3x
          </p>
        </div>
      ),
    },
    {
      title: 'Potential Earnings',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal mb-3">
            Full-time Pay Range $50 - $150/hour
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal">
            You can make $12-20/hour on part-time
          </p>
        </div>
      ),
    },
    {
      title: 'Time Saved',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[1.5rem] font-normal">
            Time saved for Interview Prep 80 hours/10 Days
          </p>
        </div>
      ),
    },
  ];

  const perspectiveData = [
    {
      content: (
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Resume Consultation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expert guidance for your career journey
              </p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-4">
                $500/hour
              </p>
            </div>
          </div>
        </Card>
      ),
    },
    {
      content: (
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Concert Tickets</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Premium entertainment experience
              </p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-4">
                $500
              </p>
            </div>
          </div>
        </Card>
      ),
    },
    {
      content: (
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Long Weekend Trip</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Escape to your dream destination
              </p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-4">
                $300
              </p>
            </div>
          </div>
        </Card>
      ),
    },
    {
      content: (
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">University Lecture</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Knowledge from industry experts
              </p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-4">
                $300/hour
              </p>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Let's do a Cost-Benefit Analysis
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We know that you want to evaluate the value we bring to the table for the investment you make.
            <br /> 
            Discover how productively you can use that time and how we compare with the standard plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Timeline data={journeyData} animationSpeed={1} />
          </div>
          <div>
            <Timeline data={perspectiveData} animationSpeed={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}

