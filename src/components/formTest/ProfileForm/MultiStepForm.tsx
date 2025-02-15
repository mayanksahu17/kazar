import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInfo from './steps/PersonalInfo';
import RolesSkills from './steps/RolesSkills';
import Expectations from './steps/Expectations';
import ExperienceSection from './steps/Experience';
import CVSection from './steps/CV';
import DiversityInclusion from './steps/DiversityInclusion';
import type { FormData } from '@/lib/database/models/User/types';

const steps = [
  { id: 'personal', title: 'Personal Information', component: PersonalInfo },
  { id: 'roles', title: 'Roles & Skills', component: RolesSkills },
  { id: 'expectations', title: 'Expectations', component: Expectations },
  { id: 'experiences', title: 'Experience', component: ExperienceSection },
  { id: 'cv', title: 'CV', component: CVSection },
  { id: 'diversity', title: 'Diversity & Inclusion', component: DiversityInclusion },
];

interface MultiStepFormProps {
  onClose: () => void;
  profileIndex: number;
}

export default function MultiStepForm({ onClose, profileIndex }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const form = useForm<FormData>();
  const { handleSubmit, getValues } = form;

  // Log data after each step
  const handleNext = (stepData: Partial<FormData>) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...stepData };
      //console.log('Data after step', currentStep + 1, updatedData); // Log the updated data after each step
      return updatedData;
    });
    setCurrentStep((prev) => prev + 1); // Move to the next step
  };

  // Log data on final submission
  const handleFinalSubmit = handleSubmit(async (data: FormData) => {
   // console.log('Final form data:', data); // Log all data before submitting
    await onSubmit(data); // Submit the entire form data
  });

  const onSubmit = async (data: FormData) => {
    try {
      const updatedProfiles = { ...formData, ...data }; // Combine current form data with submitted data
     // console.log('Submitting form data to API:', updatedProfiles); // Log data before sending to the backend
      await fetch('/api/ProfileForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedProfiles, profileIndex }),
      });
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
      </div>

      <form onSubmit={currentStep === steps.length - 1 ? handleFinalSubmit : undefined}>
        <Card className="p-6 sm:p-8 md:p-10">
          {/* Render the current step component */}
          <CurrentStepComponent form={form} profileIndex={profileIndex} />

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button type="submit" className="w-full border border-black sm:w-auto">
                Complete Profile
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit((data) => handleNext(data))}
                className="w-full sm:w-auto"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
