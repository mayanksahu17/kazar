'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HiredEasy - Career Opportunities | Join Our Team',
  description: 'Explore exciting career opportunities at HiredEasy and join our mission to simplify the job application process for job seekers worldwide.',
};


const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "HiredEasy Career",
  "url": "https://hiredeasy.com/career",
  "description": "Explore career opportunities with HiredEasy."
};

export function CareerPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    university: '',
    location: '',
    workAuthorization: '',
    experience: '',
    resume: '',
    resumeName: '',
    resumeMimeType: '',
    coverLetter: '',
    coverLetterName: '',
    coverLetterMimeType: '',
  });
  const [copyMessage, setCopyMessage] = useState('');

  const jobPositions = [
    {
      title: 'Software Engineer',
      description:
        'We are seeking a skilled Software Engineer to join our dynamic team. You will be responsible for developing, testing, and maintaining cutting-edge web applications. You will collaborate with cross-functional teams to drive our innovative product roadmap forward. Ideal candidates will have a strong background in web technologies and a passion for creating high-quality software solutions.',
      experience: '2-5 years',
      location: 'Remote, USA',
    },
    {
      title: 'Data Analyst Intern',
      description:
        'We are looking for a motivated Data Analyst Intern to join our product team. As a Data Analyst Intern, you will drive product initiatives with a user-centered approach, collaborating closely with engineering and design teams to deliver exceptional user experiences. This role provides a unique opportunity to gain hands-on experience in data analysis and product development.',
      experience: 'Internship',
      location: 'USA',
    },
    {
      title: 'Machine Learning Intern',
      description:
        'We are excited to offer an internship opportunity for a talented Machine Learning Intern. In this role, you will work on designing intuitive and delightful user interfaces, shaping the way users interact with our products from the ground up. You will be involved in various aspects of machine learning projects, from data preprocessing to model deployment. This is a great opportunity to apply your machine learning skills in a real-world setting.',
      experience: 'Internship',
      location: 'Remote, USA',
    },
    // More positions can be added here
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('job');
    if (jobTitle) {
      openModal(jobTitle);
    }
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        setFormData({
          ...formData,
          [name]: reader.result.split(',')[1],
          [`${name}Name`]: file?.name || '',
          [`${name}MimeType`]: file?.type || '',
        });
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (fileType: string) => {
    setFormData({
      ...formData,
      [fileType]: '',
      [`${fileType}Name`]: '',
      [`${fileType}MimeType`]: '',
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptURL =
      'https://script.google.com/macros/s/AKfycbwgIcE5YtLW46u_NUuo_veD68o7hKZHYGflDCNPfCUKQRRqELArRcPSjGN7ObvUQPdD/exec';
    const data = new URLSearchParams(formData as any);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Success!', response);
      alert('Application submitted successfully!');
      setModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error!', error);
      alert('There was an error submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (jobTitle: string) => {
    setCurrentJob(jobTitle);
    setModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove('overflow-hidden');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      university: '',
      location: '',
      workAuthorization: '',
      experience: '',
      resume: '',
      resumeName: '',
      resumeMimeType: '',
      coverLetter: '',
      coverLetterName: '',
      coverLetterMimeType: '',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyMessage('Link copied to clipboard!');
        setTimeout(() => {
          setCopyMessage('');
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  const handleShareJob = (jobTitle: string) => {
    const randomLink = `${window.location.origin}/career?job=${jobTitle.replace(/\s+/g, '-')}&redirect=${Math.random()
      .toString(36)
      .substring(7)}`;
    copyToClipboard(randomLink);
  };

  return (
    <>
    <head>
  <title>Join Our Team - Career Opportunities at HiredEasy</title>
  <meta name="description" content="Explore exciting career opportunities at HiredEasy. Join our mission to simplify job applications. Apply now for roles in software engineering, data analysis, and more." />
  <meta name="keywords" content="career opportunities, job openings, software engineer, data analyst, machine learning intern, HiredEasy careers" />
  <meta name="author" content="HiredEasy" />
  <meta property="og:title" content="Join Our Team - Career Opportunities at HiredEasy" />
  <meta property="og:description" content="Explore exciting career opportunities at HiredEasy. Join our mission to simplify job applications. Apply now for roles in software engineering, data analysis, and more." />
  <meta property="og:image" content="https://hiredeasy.com/logo.png" />
  <meta property="og:url" content="https://hiredeasy.com/career" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Join Our Team - Career Opportunities at HiredEasy" />
  <meta name="twitter:description" content="Explore exciting career opportunities at HiredEasy. Join our mission to simplify job applications. Apply now for roles in software engineering, data analysis, and more." />
  <meta name="twitter:image" content="https://hiredeasy.com/Hiredeasy.png" />
  <link rel="canonical" href="https://hiredeasy.com/career" />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
</head>

      <Navbar />
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <header className="bg-teal-700 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Join Our Team</h1>
          <p className="text-xl">
            At HiredEasy, we're revolutionizing the way the world works. Join
            our vibrant team and help us build an exciting future.
          </p>
        </div>
      </header>
      <main className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobPositions.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                  <button
                    onClick={() => handleShareJob(job.title)}
                    className="inline-flex items-center text-blue-600"
                  >
                    <svg
                      className="h-5 w-5 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 12v-1m8-7l-8 8m8-8l8 8M12 4v1m0 0v16m0-16l-8 8m8-8l8 8"
                      />
                    </svg>
                    Share
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-2">{job.description}</p>
                  <p className="text-gray-600 mb-2">
                    <strong>Experience:</strong> {job.experience}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <button
                    onClick={() => openModal(job.title)}
                    className="mt-auto inline-flex items-center justify-center px-5 py-3 bg-green-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center h-screen w-screen overflow-y-auto"
            id="my-modal"
          >
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 mx-auto overflow-y-auto max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentJob} Job Application
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600"
                      onChange={handleInputChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600"
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="university"
                    placeholder="University Name"
                    className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600"
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600">
                      <label
                        htmlFor="location"
                        className="block text-gray-700 mb-2"
                      >
                        Location
                      </label>
                      <select
                        name="location"
                        id="location"
                        required
                        className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-green-600"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Austin">Austin</option>
                        {/* Add more USA locations as needed */}
                      </select>
                    </div>
                    <div className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600">
                      <label className="block text-gray-700 mb-2">
                        Are you authorized to work in the USA?
                      </label>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="workAuthorization"
                            value="Yes"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            name="workAuthorization"
                            value="No"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600">
                      <label className="block text-gray-700 mb-2">
                        Do you need visa sponsorship?
                      </label>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="visaSponsorship"
                            value="Yes"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            name="visaSponsorship"
                            value="No"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600">
                      <label className="block text-gray-700 mb-2">
                        Do you have relevant experience for this role?
                      </label>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="relevantExperience"
                            value="Yes"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            name="relevantExperience"
                            value="No"
                            className="form-radio"
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="experience"
                    placeholder="Years of Experience"
                    required
                    className="w-full p-4 border rounded focus:ring-2 focus:ring-green-600"
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="file-upload-wrapper relative">
                      <label className="block w-full px-5 py-3 bg-green-600 text-white rounded cursor-pointer text-center focus:ring-2 focus:ring-green-600">
                        {formData.resumeName
                          ? `Uploaded: ${formData.resumeName}`
                          : 'Upload Resume'}
                        <input
                          type="file"
                          name="resume"
                          required
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      {formData.resumeName && (
                        <button
                          type="button"
                          onClick={() => removeFile('resume')}
                          className="absolute top-0 right-0 mt-2 mr-2 text-white bg-red-500 rounded-full h-6 w-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                    <div className="file-upload-wrapper relative">
                      <label className="block w-full px-5 py-3 bg-green-600 text-white rounded cursor-pointer text-center focus:ring-2 focus:ring-green-600">
                        {formData.coverLetterName
                          ? `Uploaded: ${formData.coverLetterName}`
                          : 'Upload Cover Letter'}
                        <input
                          type="file"
                          name="coverLetter"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      {formData.coverLetterName && (
                        <button
                          type="button"
                          onClick={() => removeFile('coverLetter')}
                          className="absolute top-0 right-0 mt-2 mr-2 text-white bg-red-500 rounded-full h-6 w-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 bg-green-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-xl font-semibold"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6l4 2"
                        />
                      </svg>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      {copyMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-md">
          {copyMessage}
        </div>
      )}
      <Footer />
    </>
  );
}

export default CareerPage;
