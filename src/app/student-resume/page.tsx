'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "@/components/test/ProfileForm";
import TemplateSelection from "@/components/test/TemplateSelection";
import JobDescription from "@/components/test/JobDescription";
import ResumePreview from "@/components/test/ResumePreview";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const { toast } = useToast();
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setProgress((step + 1) * 25);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress((step - 1) * 25);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-gray-500">Create your professional resume in minutes</p>
        </div>

        <Card className="p-6">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Profile</span>
              <span>Template</span>
              <span>Job Details</span>
              <span>Preview</span>
            </div>
          </div>

          <Tabs value={String(step)} className="space-y-6">
            <TabsContent value="1">
              <ProfileForm onNext={handleNext} />
            </TabsContent>
            
            <TabsContent value="2">
              <TemplateSelection onNext={handleNext} onBack={handleBack} />
            </TabsContent>
            
            <TabsContent value="3">
              <JobDescription onNext={handleNext} onBack={handleBack} />
            </TabsContent>
            
            <TabsContent value="4">
              <ResumePreview onBack={handleBack} />
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;