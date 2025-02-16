import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface JobDescriptionProps {
  onNext: () => void;
  onBack: () => void;
}

const JobDescription = ({ onNext, onBack }: JobDescriptionProps) => {
  const [description, setDescription] = useState("");

  const handleContinue = () => {
    if (description.trim()) {
      // TODO: Save job description
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Job Description</h2>
        <p className="text-gray-500 mt-2">
          Paste the job description to optimize your resume for ATS
        </p>
      </div>

      <Card className="p-6">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="min-h-[200px]"
        />
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!description.trim()}>
          Generate Resume
        </Button>
      </div>
    </motion.div>
  );
};

export default JobDescription;