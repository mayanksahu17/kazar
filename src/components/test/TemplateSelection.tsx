import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TemplateSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant layout that lets your content shine",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique design elements that help you stand out",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Professional template perfect for senior positions",
  },
];

const TemplateSelection = ({ onNext, onBack }: TemplateSelectionProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleContinue = () => {
    if (selectedTemplate) {
      // TODO: Save template selection
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
        <h2 className="text-2xl font-semibold">Choose Your Template</h2>
        <p className="text-gray-500 mt-2">Select a template that best represents your professional style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-2 border-primary"
                  : "hover:border-gray-300"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{template.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!selectedTemplate}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default TemplateSelection;