"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Trash, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface Experience {
  _id?: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceProps {
  data: Experience[] | { experiences?: Experience[] };
  onUpdate: (data: { experiences: Experience[] }) => Promise<void>;
}

export default function ExperienceSection({ data, onUpdate }: ExperienceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const experiencesArray: Experience[] = Array.isArray(data)
      ? data
      : data.experiences || (data as any).profiles?.[0]?.experiences || [];
    setExperiences(experiencesArray);
  }, [data]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedExperience((prev) => (prev === id ? null : id));
  }, []);

  const validateExperience = (experience: Experience): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!experience.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!experience.company.trim()) {
      newErrors.company = "Company is required";
    }
    if (!experience.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!experience.current && !experience.endDate) {
      newErrors.endDate = "End date is required for non-current positions";
    }
    if (experience.startDate && experience.endDate && new Date(experience.startDate) > new Date(experience.endDate)) {
      newErrors.endDate = "End date cannot be earlier than start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExperience = async () => {
    if (validateExperience(newExperience)) {
      const newExp = { ...newExperience, _id: String(Date.now()) };
      const updatedExperiences = [...experiences, newExp];
      setExperiences(updatedExperiences);
      try {
        await onUpdate({ experiences: updatedExperiences });
        setNewExperience({
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        });
        setShowAddExperienceForm(false);
      } catch (err) {
        console.error("Error adding new experience:", err);
        setExperiences(experiences);
      }
    }
  };

  const handleRemoveExperience = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/deleteExperience?experienceId=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete experience");
      }
      const updatedExperiences = experiences.filter((exp) => exp._id !== id);
      setExperiences(updatedExperiences);
      await onUpdate({ experiences: updatedExperiences });
    } catch (err) {
      console.error("Error removing experience:", err);
    }
  }, [experiences, onUpdate]);

  const handleUpdateExperience = async (id: string, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp._id === id) {
        const updatedExp = { ...exp, [field]: value };
        if (field === "current" && value) {
          updatedExp.endDate = ""; // Clear endDate if current is checked
        }
        return updatedExp;
      }
      return exp;
    });
    setExperiences(updatedExperiences);
    setErrors({});
  };

  const ExperienceCard = React.memo(({ exp }: { exp: Experience }) => (
    <Card className="bg-white shadow-md rounded-lg p-5 space-y-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{exp.title}</h3>
          <p className="text-muted-foreground text-sm">{exp.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 transition-colors duration-300"
            onClick={() => toggleExpand(exp._id!)}
          >
            {expandedExperience === exp._id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
          {isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 transition-colors duration-300"
              onClick={() => handleRemoveExperience(exp._id!)}
            >
              <Trash className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {expandedExperience === exp._id && (
        <div className="space-y-2">
          <div>
            <span className="text-muted-foreground text-sm font-medium">Dates:</span>
            <div className="text-sm text-muted-foreground">
              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
            </div>
          </div>
          {exp.description && (
            <div>
              <span className="text-muted-foreground text-sm font-medium">Description:</span>
              <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
            </div>
          )}

          {isEditing && (
            <>
              <Input
                value={exp.title}
                onChange={(e) => handleUpdateExperience(exp._id!, "title", e.target.value)}
                placeholder="Position"
                className={`mt-4 w-full max-w-md ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <Input
                value={exp.company}
                onChange={(e) => handleUpdateExperience(exp._id!, "company", e.target.value)}
                placeholder="Company"
                className={`mt-2 w-full max-w-md ${errors.company ? 'border-red-500' : ''}`}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp._id!, "startDate", e.target.value)}
                    placeholder="Start Date"
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleUpdateExperience(exp._id!, "endDate", e.target.value)}
                    placeholder="End Date"
                    disabled={exp.current}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`current-${exp._id}`}
                  checked={exp.current}
                  onChange={(e) => handleUpdateExperience(exp._id!, "current", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`current-${exp._id}`}>Current position</label>
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => handleUpdateExperience(exp._id!, "description", e.target.value)}
                placeholder="Description"
                className="mt-2 min-h-[80px] w-full max-w-md"
              />
            </>
          )}
        </div>
      )}
    </Card>
  ));

  ExperienceCard.displayName = "ExperienceCard";

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-sm rounded-lg p-5 border-b-2 border-gray-300 
        flex flex-col sm:flex-row 
        justify-between 
        items-start sm:items-center 
        gap-4 sm:gap-0">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-muted-foreground text-sm">
            Outline your professional experience to help employers understand your background.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="default" className="w-full sm:w-auto">
              Edit
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setShowAddExperienceForm(false);
                  setErrors({});
                }}
                variant="destructive"
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddExperienceForm(true)}
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
              <Button
                onClick={async () => {
                  let isValid = true;
                  const updatedExperiences = experiences.map(exp => {
                    if (!validateExperience(exp)) {
                      isValid = false;
                    }
                    return exp;
                  });
                  if (isValid) {
                    try {
                      await onUpdate({ experiences: updatedExperiences });
                      setIsEditing(false);
                      setErrors({});
                    } catch (err) {
                      console.error("Error saving experiences:", err);
                    }
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
              >
                Save All
              </Button>
            </div>
          )}
        </div>
      </div>

      {isEditing && showAddExperienceForm && (
        <div className="border-2 border-black p-5 rounded-lg mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Experience
          </h3>
          <div>
            <span className="font-medium text-sm">Position</span>
            <Input
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              placeholder="Position"
              className={`mt-4 w-full max-w-md ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <span className="font-medium text-sm">Company</span>
            <Input
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              placeholder="Company"
              className={`mt-2 w-full max-w-md ${errors.company ? 'border-red-500' : ''}`}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <span className="font-medium text-sm">Start Date</span>
              <Input
                type="date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                placeholder="Start Date"
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <span className="font-medium text-sm">End Date</span>
              <Input
                type="date"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="End Date"
                disabled={newExperience.current}
                className={errors.endDate ? 'border-red-500' : ''}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="current-checkbox"
              checked={newExperience.current}
              onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="current-checkbox">Current position</label>
          </div>
          <div>
            <span className="font
-medium text-sm">Description</span>
            <Textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Description"
              className="mt-2 min-h-[80px] w-full max-w-md"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Button onClick={handleAddExperience} className="bg-blue-500 hover:bg-blue-600 text-white">
              Save
            </Button>
            <Button
              onClick={() => {
                setShowAddExperienceForm(false);
                setErrors({});
              }}
              variant="ghost"
              className="hover:bg-gray-100 text-black"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp._id} exp={exp} />
        ))}
      </div>
    </div>
  );
}

