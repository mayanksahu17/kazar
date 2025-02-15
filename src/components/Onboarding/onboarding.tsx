"use client"

import { useEffect, useState } from "react"
import { Label } from "./label"
import { Input } from "./input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select"
import { Button } from "../ui/button"
import React from "react"
import Navbar from '../navbar/navbar'
import Modal from './Call'
import Footer from "../footer/footer"
import { HeroParallaxDemo } from "./HeroParallex"
import { motion, AnimatePresence } from "framer-motion"

export function Onboarding() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    education: string;
    major: string;
    graduationyear: string;
    currentrole: string;
    currentcompany: string;
    yearsofexperience: string;
    resume: string | null;
    resumename: string;
    resumemimetype: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    education: "",
    major: "",
    graduationyear: "",
    currentrole: "",
    currentcompany: "",
    yearsofexperience: "",
    resume: null,
    resumename: "",
    resumemimetype: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    // Clear specific error when field is filled
    if (value.trim() !== '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ''
      }));
    }
  };

  const handleFileChange = (e: { target: { id: any; files: any } }) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          setFormData(prevState => ({
            ...prevState,
            resume: base64String,
            resumename: file.name,
            resumemimetype: file.type
          }));
          setErrors(prevErrors => ({
            ...prevErrors,
            resume: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = 'https://script.google.com/macros/s/AKfycbxhS88w-PVah8s2Htyj8IinBGpcWUtCZ6LYvO5qO3aaZBuIgfx4HEZVs1jkRNLAH7ALyw/exec';
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string);
    });

    setIsModalOpen(true);

    fetch(url, {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.text())
    .then(result => {
      console.log("Server response:", result);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleFinalSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isFormValid && validateStep(currentStep)) {
      handleSubmit(e);
    }
  };

  const handleScheduleCall = () => {
    window.location.href = "https://apply.neetocal.com/meeting-with-nikhil-jain";
  };

  const validateStep = (step: number): boolean => {
    let stepErrors: {[key: string]: string} = {};
    let isStepValid = true;

    const validateField = (field: string, value: string, errorMessage: string) => {
      if (value.trim() === '') {
        stepErrors[field] = errorMessage;
        isStepValid = false;
      }
    };

    switch (step) {
      case 1:
        validateField('firstname', formData.firstname, 'First name is required');
        validateField('lastname', formData.lastname, 'Last name is required');
        validateField('email', formData.email, 'Email is required');
        validateField('phone', formData.phone, 'Phone number is required');
        break;
      case 2:
        validateField('education', formData.education, 'Education level is required');
        validateField('major', formData.major, 'Major is required');
        validateField('graduationyear', formData.graduationyear, 'Graduation year is required');
        break;
      case 3:
        validateField('currentrole', formData.currentrole, 'Current role is required');
        validateField('currentcompany', formData.currentcompany, 'Current company is required');
        validateField('yearsofexperience', formData.yearsofexperience, 'Years of experience is required');
        break;
      case 4:
        if (!formData.resume) {
          stepErrors['resume'] = 'Please upload your resume';
          isStepValid = false;
        }
        break;
    }

    setErrors(stepErrors);
    return isStepValid;
  };

  useEffect(() => {
    const isValid = Object.values(formData).every(value => value !== "" && value !== null) && Object.values(errors).every(error => error === '');
    setIsFormValid(isValid);
  }, [formData, errors]);

  const steps = [
    { title: "Personal Info", description: "Basic details about you" },
    { title: "Education", description: "Your educational background" },
    { title: "Work Experience", description: "Your professional journey" },
    { title: "Resume", description: "Upload your CV" },
  ];

  return (
    <>
      <Navbar />
      <HeroParallaxDemo />
      <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-black/30 p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <motion.h2 
              className="text-4xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Join Our Team
            </motion.h2>
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col items-center ${
                      currentStep === index + 1 ? "text-blue-400" : "text-gray-500"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep === index + 1
                          ? "bg-blue-500/20 border-blue-400 text-blue-400"
                          : "bg-gray-800/50 border-gray-700 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-sm mt-2 font-medium">{step.title}</div>
                    <div className="text-xs mt-1 text-gray-400">{step.description}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstname" className="text-gray-300">First Name</Label>
                          <Input
                            id="firstname"
                            placeholder="Alex"
                            className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.firstname ? 'border-red-500' : ''}`}
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                          />
                          {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname" className="text-gray-300">Last Name</Label>
                          <Input
                            id="lastname"
                            placeholder="Doe"
                            className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.lastname ? 'border-red-500' : ''}`}
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                          />
                          {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="alex@example.com"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.email ? 'border-red-500' : ''}`}
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 555-5555"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.phone ? 'border-red-500' : ''}`}
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="education" className="text-gray-300">Education</Label>
                        <Select 
                          value={formData.education} 
                          onValueChange={(value) => {
                            setFormData(prevState => ({ ...prevState, education: value }));
                            setErrors(prevErrors => ({ ...prevErrors, education: '' }));
                          }}
                        >
                          <SelectTrigger
                            id="education"
                            className={`bg-gray-800/50 border-gray-700 text-white ${errors.education ? 'border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-700">
                            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="master">Master's Degree</SelectItem>
                            <SelectItem value="doctorate">PHD</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major" className="text-gray-300">Major</Label>
                        <Input
                          id="major"
                          placeholder="Computer Science"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.major ? 'border-red-500' : ''}`}
                          value={formData.major}
                          onChange={handleChange}
                          required
                        />
                        {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationyear" className="text-gray-300">Graduation Year</Label>
                        <Input
                          id="graduationyear"
                          type="number"
                          placeholder="2023"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.graduationyear ? 'border-red-500' : ''}`}
                          value={formData.graduationyear}
                          onChange={handleChange}
                          required
                        />
                        {errors.graduationyear && <p className="text-red-500 text-sm mt-1">{errors.graduationyear}</p>}
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentrole" className="text-gray-300">Current Role</Label>
                        <Input
                          id="currentrole"
                          placeholder="Software Engineer"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.currentrole ? 'border-red-500' : ''}`}
                          value={formData.currentrole}
                          onChange={handleChange}
                          required
                        />
                        {errors.currentrole && <p className="text-red-500 text-sm mt-1">{errors.currentrole}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentcompany" className="text-gray-300">Current Company</Label>
                        <Input
                          id="currentcompany"
                          placeholder="Acme Inc"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.currentcompany ? 'border-red-500' : ''}`}
                          value={formData.currentcompany}
                          onChange={handleChange}
                          required
                        />
                        {errors.currentcompany && <p className="text-red-500 text-sm mt-1">{errors.currentcompany}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsofexperience" className="text-gray-300">Years of Experience</Label>
                        <Input
                          id="yearsofexperience"
                          type="number"
                          placeholder="5"
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 ${errors.yearsofexperience ? 'border-red-500' : ''}`}
                          value={formData.yearsofexperience}
                          onChange={handleChange}
                          required
                        />
                        {errors.yearsofexperience && <p className="text-red-500 text-sm mt-1">{errors.yearsofexperience}</p>}
                      </div>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="resume" className="text-gray-300">Upload Resume</Label>
                        <div className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-400 transition-colors duration-200 bg-gray-800/30 ${errors.resume ? 'border-red-500' : 'border-gray-700'}`}>
                          <input
                            id="resume"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            required
                          />
                          <div className="w-16 h-16 mb-4 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <span className="text-gray-300 text-lg font-medium">
                            {formData.resumename || "Choose file or drag and drop"}
                          </span>
                          <span className="text-gray-500 text-sm mt-2">PDF, DOC, DOCX up to 10MB</span>
                        </div>
                        {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 py-3 bg-transparent text-gray-300 border border-gray-700 rounded-full hover:bg-gray-800 hover:border-gray-600 focus:ring-2 focus:ring-blue-500/20"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 4 && (
                  <Button
                    type="button"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full hover:from-blue-700 hover:to-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    onClick={() => {
                      if (validateStep(currentStep)) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === 4 && (
                  <Button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-full hover:from-green-700 hover:to-green-500 focus:ring-2 focus:ring-green-500/20 disabled:opacity-50"
                    disabled={!isFormValid}
                    onClick={handleFinalSubmit}
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onScheduleCall={handleScheduleCall}
      />
      <Footer />
    </>
  )
}

