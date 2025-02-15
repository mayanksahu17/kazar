'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Save, X, Info } from 'lucide-react';

interface DiversityInclusionData {
  gender?: string;
  ethnicity?: string;
  disability?: string;
  veteranStatus?: string;
}

interface DiversityInclusionProps {
  data: DiversityInclusionData;
  onUpdate: (data: DiversityInclusionData) => Promise<void>;
}

export default function DiversityInclusion({ data, onUpdate }: DiversityInclusionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<DiversityInclusionData>(data || {});
  const [errors, setErrors] = useState<Partial<Record<keyof DiversityInclusionData, string>>>({});

  const handleChange = (field: keyof DiversityInclusionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DiversityInclusionData, string>> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const field = key as keyof DiversityInclusionData;
      if (!formData[field]) {
        newErrors[field] = `Please select a ${field}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onUpdate(formData);
      setIsEditing(false);
    }
  };

  const renderField = (label: string, value: string | undefined, field: keyof DiversityInclusionData) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-lg font-semibold text-gray-800">
        {label}
      </Label>
      {isEditing ? (
        <div>
          <Select
            value={formData[field]}
            onValueChange={(value) => handleChange(field, value)}
          >
            <SelectTrigger id={field} className={`w-full border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              {getOptionsForField(field)}
            </SelectContent>
          </Select>
          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{value || 'Not specified'}</p>
      )}
    </div>
  );

  const getOptionsForField = (field: keyof DiversityInclusionData) => {
    switch (field) {
      case 'gender':
        return (
          <>
            <SelectItem className="bg-white" value="Male">Male</SelectItem>
            <SelectItem className="bg-white" value="Female">Female</SelectItem>
            <SelectItem className="bg-white" value="Non-binary">Non-binary</SelectItem>
            <SelectItem className="bg-white" value="Other">Other</SelectItem>
            <SelectItem className="bg-white" value="Prefer not to say">Prefer not to say</SelectItem>
          </>
        );
      case 'ethnicity':
        return (
          <>
            <SelectItem className="bg-white" value="Asian">Asian</SelectItem>
            <SelectItem className="bg-white" value="Black">Black</SelectItem>
            <SelectItem className="bg-white" value="Hispanic">Hispanic</SelectItem>
            <SelectItem className="bg-white" value="White">White</SelectItem>
            <SelectItem className="bg-white" value="Mixed">Mixed</SelectItem>
            <SelectItem className="bg-white" value="Other">Other</SelectItem>
            <SelectItem className="bg-white" value="Prefer not to say">Prefer not to say</SelectItem>
          </>
        );
      case 'disability':
      case 'veteranStatus':
        return (
          <>
            <SelectItem className="bg-white" value="Yes">Yes</SelectItem>
            <SelectItem className="bg-white" value="No">No</SelectItem>
            <SelectItem className="bg-white" value="Prefer not to say">Prefer not to say</SelectItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">Diversity & Inclusion</h2>
            <p className="text-sm text-muted-foreground">
              This section includes an optional survey on your diversity and inclusion information.
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit diversity and inclusion information</span>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel editing</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSubmit}>
                  <Save className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-lg p-4 flex items-center text-blue-700">
          <Info className="h-4 w-4 mr-2" />
          <span>
            Skipping this survey will still contribute to your profile strength.
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
        <form onSubmit={handleSubmit}>
          {renderField('Gender Identity', formData.gender, 'gender')}
          {renderField('Ethnicity', formData.ethnicity, 'ethnicity')}
          {renderField('Disability', formData.disability, 'disability')}
          {renderField('Veteran Status', formData.veteranStatus, 'veteranStatus')}
        </form>
      </div>
    </div>
  );
}

