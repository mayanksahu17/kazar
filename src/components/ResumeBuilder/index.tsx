import React, { useState } from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectForm';
import { ResumePreview } from './ResumePreview';
import { ResumeProfile } from '../../types/resume';
import axios from 'axios';

const steps = [
  'Personal Info',
  'Education',
  'Experience',
  'Skills',
  'Projects',
  'Preview'
] as const;

export const ResumeBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeProfile>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handlePersonalInfoSubmit = (data: ResumeProfile['personalInfo']) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
    setCurrentStep(1);
  };

  const handleEducationSubmit = (data: { education: ResumeProfile['education'] }) => {
    setResumeData(prev => ({ ...prev, education: data.education }));
    setCurrentStep(2);
  };

  const handleExperienceSubmit = (data: { experience: ResumeProfile['experience'] }) => {
    setResumeData(prev => ({ ...prev, experience: data.experience }));
    setCurrentStep(3);
  };

  const handleSkillsSubmit = (data: { skills: ResumeProfile['skills'] }) => {
    setResumeData(prev => ({ ...prev, skills: data.skills }));
    setCurrentStep(4);
  };

  const handleProjectsSubmit = (data: { projects: ResumeProfile['projects'] }) => {
    setResumeData(prev => ({ ...prev, projects: data.projects }));
    setCurrentStep(5);
  };

  const handleEnhanceResume = async () => {
    setIsEnhancing(true);
    try {
      const response = await axios.post('/api/enhance-resume', resumeData);
      setResumeData(prev => ({
        ...prev,
        ...response.data
      }));
    } catch (error) {
      console.error('Error enhancing resume:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                index === currentStep
                  ? 'text-blue-600 font-semibold'
                  : index < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="mt-8">
        {currentStep === 0 && (
          <PersonalInfoForm
            onSubmit={handlePersonalInfoSubmit}
            defaultValues={resumeData.personalInfo}
          />
        )}
        {currentStep === 1 && (
          <EducationForm
            onSubmit={handleEducationSubmit}
            defaultValues={{ education: resumeData.education }}
          />
        )}
        {currentStep === 2 && (
          <ExperienceForm
            onSubmit={handleExperienceSubmit}
            defaultValues={{ experience: resumeData.experience }}
          />
        )}
        {currentStep === 3 && (
          <SkillsForm
            onSubmit={handleSkillsSubmit}
            defaultValues={{ skills: resumeData.skills }}
          />
        )}
        {currentStep === 4 && (
          <ProjectsForm
            onSubmit={handleProjectsSubmit}
            defaultValues={{ projects: resumeData.projects }}
          />
        )}
        {currentStep === 5 && (
          <ResumePreview
            data={resumeData}
            onEnhance={handleEnhanceResume}
            isEnhancing={isEnhancing}
          />
        )}
      </div>
    </div>
  );
};