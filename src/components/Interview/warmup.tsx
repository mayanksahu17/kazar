import React from 'react';

const Warmup = () => {
  const cards = [
    {
      title: 'Google Interview Warmup',
      description:
        'A quick and interactive way to prepare for your next interview. Practice key questions, get valuable insights into your answers, and boost your confidence.',
      buttonText: 'Get Started',
      buttonLink:
        'https://www.cloudskillsboost.google/interview_warmup/category',
      imageAlt: 'Google Interview Warmup',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/w_600,h_300/v1734801375/OracleCareer_dhgaqb.png',
    },
    {
      title: 'Google - Machine Learning Crash Course',
      description:
        'Google fast-paced, practical introduction to machine learning, featuring a series of lessons with video lectures, interactive visualizations, and hands-on practice exercises.',
      buttonText: 'Get Started',
      buttonLink: 'https://developers.google.com/machine-learning/crash-course',
      imageAlt: 'Google Machine Learning',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/w_600,h_400/v1737183993/Screenshot_2025-01-18_at_12.36.05_PM_cl3eb2.png',
    },
    {
      title: 'Simplilearn DSA Course',
      description:
        'Master the foundations of Data Structures and Algorithms in this free course. Learn how to implement key concepts like arrays, linked lists, stacks, and queues. Perfect for beginners aiming to excel in coding interviews.',
      buttonText: 'Explore Now',
      buttonLink:
        'https://www.simplilearn.com/free-data-structures-algorithms-course-skillup?utm_source=chatgpt.com',
      imageAlt: 'Simplilearn DSA',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183401/Screenshot_2025-01-18_at_12.14.18_PM_iga3oq.png',
    },
    {
      title: 'UpGrad DSA Course',
      description:
        'Get a deep understanding of Data Structures and Algorithms in this free course by UpGrad. Build problem-solving skills while learning sorting techniques, recursion, and complexity analysis.',
      buttonText: 'Get Started',
      buttonLink:
        'https://www.upgrad.com/free-courses/it-technology/data-structures-and-algorithm-course-free/?utm_source=chatgpt.com',
      imageAlt: 'UpGrad DSA',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183401/Screenshot_2025-01-18_at_12.21.31_PM_ylfky9.png',
    },
    {
      title: 'IBM SkillsBuild - Getting Started with Data',
      description:
        'Explore the world of data with IBM SkillsBuild’s free course. Gain foundational skills in data analysis and visualization while earning an industry-recognized badge.',
      buttonText: 'Enroll Now',
      buttonLink:
        'https://skillsbuild.org/college-students/digital-credentials/getting-started-with-data',
      imageAlt: 'IBM SkillsBuild',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183400/Screenshot_2025-01-18_at_12.22.55_PM_xcshue.png',
    },
    {
      title: 'Coursera Data Engineering Certification',
      description:
        'Develop practical skills in data engineering with Coursera’s professional certification. Learn to build scalable data pipelines, work with big data systems, and utilize cloud platforms.',
      buttonText: 'Learn More',
      buttonLink:
        'https://www.coursera.org/professional-certificates/data-engineering',
      imageAlt: 'Coursera Data Engineering',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183402/Screenshot_2025-01-18_at_12.23.41_PM_vdrcou.png',
    },
    {
      title: 'Coursera Data & Machine Learning Specialization',
      description:
        'Dive into the intersection of data engineering and machine learning with this Google Cloud specialization. Master tools like BigQuery, TensorFlow, and Apache Beam.',
      buttonText: 'Start Learning',
      buttonLink:
        'https://www.coursera.org/specializations/gcp-data-machine-learning',
      imageAlt: 'Coursera GCP ML',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183401/Screenshot_2025-01-18_at_12.23.27_PM_bqqvxl.png',
    },
    {
      title: 'freeCodeCamp',
      description:
        'Join millions of learners on freeCodeCamp to gain hands-on programming experience. Build projects and earn certifications in web development, data analysis, machine learning, and more.',
      buttonText: 'Visit Now',
      buttonLink: 'https://www.freecodecamp.org/',
      imageAlt: 'freeCodeCamp',
      imageUrl:
        'https://res.cloudinary.com/dmky9t4sr/image/upload/v1737183408/Screenshot_2025-01-18_at_12.24.12_PM_h1mggd.png',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1 mt-32">
      <div className="text-center max-w-5xl mx-auto mb-16 space-y-8">
        <h1 className="space-y-2 text-[2.30rem] sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
          <div>Nail Every</div>
          <div>
            <span className="relative inline-block">
              Interview
              <svg
                className="absolute -bottom-4 left-0 w-full h-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 242 6"
              >
                <path
                  d="M4.10469 3.70282C9.9443 3.017 42.5812 1.44003 69.3237 0.550646C102.418 -0.549285 209.303 0.112961 226.986 1.52828C249.064 3.29481 246.738 4.59483 220.374 5.22212C175.88 6.28186 -0.00182429 6.24952 0 5.18191C0 4.63413 1.84802 3.96841 4.10469 3.70282Z"
                  fill="#3EC0DD"
                />
              </svg>
            </span>{' '}
            with Confidence.
          </div>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
          Discover comprehensive resources, tailored tools, and expert guidance
          to help you ace your interviews and secure your dream job.
        </p>
        <div className="bg-gray-100 border border-gray-300 rounded-md p-2 mt-6 text-center w-fit mx-auto">
          <p className="text-sm text-slate-600">
            We’re soon adding more courses to make you interview ready.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col"
          >
            <div className="relative w-full h-52 bg-gray-100">
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">
                {card.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-grow">
                {card.description}
              </p>
              <div className="mt-auto">
                <a
                  href={card.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  {card.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warmup;
