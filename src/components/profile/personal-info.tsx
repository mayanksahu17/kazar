'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Camera, X, Save } from 'lucide-react';
import ChangePhotoButton from "@/components/buttons/change-photo-button";

export default function PersonalInfo({ data, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data || {});
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['fullName', 'location', 'phone', 'address'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleUploadComplete = (res) => {
    setIsUploading(false);

    if (res && res.length > 0) {
      const newPhotoUrl = res[0].url;
      console.log("New photo URL received:", newPhotoUrl);

      const updatedData = { ...formData, profilePhoto: newPhotoUrl };
      console.log("Updated formData with profilePhoto:", updatedData);

      setFormData(updatedData);

      onUpdate(updatedData);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    onUpdate({ ...formData, profilePhoto: null });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-neutral-900">Profile set up</h2>
          <p className="text-sm text-neutral-600">
            This section includes the information you shared when first setting up your HiredEasy profile.
          </p>
        </div>
        {!isEditing ? (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit profile</span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel editing</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              <span className="sr-only">Save changes</span>
            </Button>
          </div>
        )}
      </div>

      <Card className="rounded-xl border border-neutral-200">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="pb-6 border-b border-neutral-200">
              <h3 className="text-lg font-semibold mb-4">Avatar</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={formData.profilePhoto || "/placeholder.svg"} alt="Profile photo" />
                  <AvatarFallback>{formData.fullName?.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Button 
                      className="w-auto px-3 py-2 text-sm font-medium rounded-md text-red-500 hover:bg-red-50 border border-red-200"
                      onClick={handleRemovePhoto}
                      disabled={!formData.profilePhoto}
                    >
                      <Camera className="h-4 w-4 mr-2" /> {formData.profilePhoto ? 'Remove photo' : 'No photo'}
                    </Button>
                    <ChangePhotoButton
                      endpoint="profilePictureUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={(error) => console.error("Upload error:", error)}
                    />
                  </div>
                  <p className="text-sm text-neutral-600">
                    File upload criteria: JPG, JPEG, PNG; max size 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Personal information</h3>
              </div>

              <div className="space-y-4">
                {[ 
                  { label: 'Full name', name: 'fullName' },
                  { label: 'Location', name: 'location' },
                  { label: 'Street address', name: 'address' },
                  { label: 'Postcode', name: 'postcode' },
                  { label: 'Phone number', name: 'phone' }
                ].map((field) => (
                  <div key={field.name} className="flex flex-col sm:flex-row items-start sm:items-center py-2">
                    <div className="w-full sm:w-1/3">
                      <span className="text-neutral-700 font-medium">{field.label}:</span>
                    </div>
                    {isEditing ? (
                      <div className="w-full sm:w-2/3 mt-2 sm:mt-0">
                        <Input
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className={`w-full ${errors[field.name] ? 'border-red-500' : ''}`}
                          aria-invalid={errors[field.name] ? 'true' : 'false'}
                          aria-describedby={`${field.name}-error`}
                        />
                        {errors[field.name] && (
                          <p id={`${field.name}-error`} className="text-red-500 text-sm mt-1">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-600 w-full sm:w-2/3 mt-2 sm:mt-0">{formData[field.name]}</span>
                    )}
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row items-start sm:items-center py-2">
                  <div className="w-full sm:w-1/3">
                    <span className="text-neutral-700 font-medium">English level:</span>
                  </div>
                  <div className="w-full sm:w-2/3 mt-2 sm:mt-0">
                    {isEditing ? (
                      <Select
                        value={formData.englishLevel}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, englishLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select English level" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg">
                          <SelectItem value="professional">Professional working proficiency</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-neutral-600 w-full">{formData.englishLevel}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
