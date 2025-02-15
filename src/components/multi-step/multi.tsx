'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, ChevronLeft, ChevronRight, Loader2, Upload } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from '../ui/alert';

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    education: [{
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]
  });

  const steps = [
    {
      title: "Personal Information",
      description: "Begin with your basic details"
    },
    {
      title: "Education",
      description: "Add your educational background"
    },
    {
      title: "Experience",
      description: "Share your work history"
    },
    {
      title: "Skills",
      description: "List your technical and soft skills"
    },
    {
      title: "Projects",
      description: "Showcase your notable projects"
    },
    {
      title: "Generate Resume",
      description: "Choose template and job description"
    }
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get the JWT token from localStorage (or cookies if you use that)
      const token = localStorage.getItem("token"); // Ensure token is stored when user logs in
  
      if (!token) {
        throw new Error("No authentication token found.");
      }
  
      const response = await fetch("/api/student-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add JWT token
        },
        body: JSON.stringify({
          ...formData,
          template: "modern", // Default template
          jobDescription: formData.jobDescription || "General resume",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Resume created:", data);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.personalInfo.fullName}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, fullName: e.target.value }
          })}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.personalInfo.email}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, email: e.target.value }
          })}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.personalInfo.phone}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, phone: e.target.value }
          })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.personalInfo.location}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, location: e.target.value }
          })}
          placeholder="City, State"
        />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={formData.personalInfo.linkedin}
          onChange={(e) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, linkedin: e.target.value }
          })}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {formData.education.map((edu, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`institution-${index}`}>Institution</Label>
            <Input
              id={`institution-${index}`}
              value={edu.institution}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].institution = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              placeholder="University Name"
            />
          </div>
          <div>
            <Label htmlFor={`degree-${index}`}>Degree</Label>
            <Input
              id={`degree-${index}`}
              value={edu.degree}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].degree = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              placeholder="Bachelor's, Master's, etc."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="date"
                value={edu.startDate}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].startDate = e.target.value;
                  setFormData({ ...formData, education: newEducation });
                }}
              />
            </div>
            <div>
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="date"
                value={edu.endDate}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].endDate = e.target.value;
                  setFormData({ ...formData, education: newEducation });
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => setFormData({
          ...formData,
          education: [...formData.education, {
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            gpa: ''
          }]
        })}
      >
        Add Education
      </Button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {formData.experience.map((exp, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`company-${index}`}>Company</Label>
            <Input
              id={`company-${index}`}
              value={exp.company}
              onChange={(e) => {
                const newExperience = [...formData.experience];
                newExperience[index].company = e.target.value;
                setFormData({ ...formData, experience: newExperience });
              }}
              placeholder="Company Name"
            />
          </div>
          <div>
            <Label htmlFor={`position-${index}`}>Position</Label>
            <Input
              id={`position-${index}`}
              value={exp.position}
              onChange={(e) => {
                const newExperience = [...formData.experience];
                newExperience[index].position = e.target.value;
                setFormData({ ...formData, experience: newExperience });
              }}
              placeholder="Job Title"
            />
          </div>
          <div>
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={exp.description}
              onChange={(e) => {
                const newExperience = [...formData.experience];
                newExperience[index].description = e.target.value;
                setFormData({ ...formData, experience: newExperience });
              }}
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`exp-startDate-${index}`}>Start Date</Label>
              <Input
                id={`exp-startDate-${index}`}
                type="date"
                value={exp.startDate}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  newExperience[index].startDate = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
              />
            </div>
            <div>
              <Label htmlFor={`exp-endDate-${index}`}>End Date</Label>
              <Input
                id={`exp-endDate-${index}`}
                type="date"
                value={exp.endDate}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  newExperience[index].endDate = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => setFormData({
          ...formData,
          experience: [...formData.experience, {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
          }]
        })}
      >
        Add Experience
      </Button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Textarea
          id="skills"
          value={formData.skills.join(', ')}
          onChange={(e) => setFormData({
            ...formData,
            skills: e.target.value.split(',').map(skill => skill.trim())
          })}
          placeholder="JavaScript, React, Node.js, etc."
        />
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {formData.projects.map((project, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`project-name-${index}`}>Project Name</Label>
            <Input
              id={`project-name-${index}`}
              value={project.name}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].name = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              placeholder="Project Name"
            />
          </div>
          <div>
            <Label htmlFor={`project-description-${index}`}>Description</Label>
            <Textarea
              id={`project-description-${index}`}
              value={project.description}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].description = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              placeholder="Describe your project"
            />
          </div>
          <div>
            <Label htmlFor={`project-technologies-${index}`}>Technologies Used</Label>
            <Input
              id={`project-technologies-${index}`}
              value={project.technologies}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].technologies = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              placeholder="React, Node.js, MongoDB, etc."
            />
          </div>
          <div>
            <Label htmlFor={`project-link-${index}`}>Project Link</Label>
            <Input
              id={`project-link-${index}`}
              value={project.link}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].link = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => setFormData({
          ...formData,
          projects: [...formData.projects, {
            name: '',
            description: '',
            technologies: '',
            link: ''
          }]
        })}
      >
        Add Project
      </Button>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="template">Resume Template</Label>
        <Select
          onValueChange={(value) => setFormData({
            ...formData,
            template: value
          })}
          defaultValue="modern"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea 
          id="jobDescription"
          value={formData.jobDescription}
          onChange={(e) => setFormData({
            ...formData,
            jobDescription: e.target.value
          })}
          placeholder="Paste the job description here for ATS optimization"
          className="h-32"
        />
      </div>
      <Alert>
        <AlertDescription>
          We'll analyze the job description and optimize your resume for ATS systems while maintaining your unique qualifications.
        </AlertDescription>
      </Alert>
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderEducation();
      case 2:
        return renderExperience();
      case 3:
        return renderSkills();
      case 4:
        return renderProjects();
      case 5:
        return renderFinalStep();
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.personalInfo.fullName && 
               formData.personalInfo.email && 
               formData.personalInfo.phone;
      case 1:
        return formData.education.length > 0 && 
               formData.education.every(edu => edu.institution && edu.degree);
      case 2:
        return formData.experience.length > 0 && 
               formData.experience.every(exp => exp.company && exp.position);
      case 3:
        return formData.skills.length > 0;
      case 4:
        return formData.projects.length > 0 && 
               formData.projects.every(proj => proj.name && proj.description);
      case 5:
        return formData.jobDescription;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        {getCurrentStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button 
            onClick={handleSubmit}
            disabled={!isStepValid() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Resume...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Generate Resume
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeForm;