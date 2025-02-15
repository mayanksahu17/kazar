'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X, Info } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Interface for expectations data structure
interface Expectations {
  hourlyRate: number
  availability: string
  workPreference: string
  rightToWork: string
  securityClearance: string
}

interface ExpectationsProps {
  data: Expectations
  onUpdate: (data: Expectations) => Promise<void>
}

export default function Expectations({ data, onUpdate }: ExpectationsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Expectations>(data)
  const [errors, setErrors] = useState<Partial<Record<keyof Expectations, string>>>({})

  const handleChange = (field: keyof Expectations, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Expectations, string>> = {}

    if (!formData.workPreference) {
      newErrors.workPreference = 'Work preference is required'
    }
    if (!formData.availability) {
      newErrors.availability = 'Availability is required'
    }
    if (!formData.hourlyRate || formData.hourlyRate < 10 || formData.hourlyRate > 100) {
      newErrors.hourlyRate = 'Hourly rate must be between 10 and 100'
    }
    if (!formData.rightToWork) {
      newErrors.rightToWork = 'Right to work information is required'
    }
    if (!formData.securityClearance) {
      newErrors.securityClearance = 'Security clearance information is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      await onUpdate(formData)
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Expectations Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Expectations</h2>
            <p className="text-sm text-muted-foreground">Define your preferences and expectations.</p>
          </div>
          {!isEditing ? (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit expectations</span>
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

        <div className="space-y-8">
          {/* Work Preference */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Work Preference:</Label>
              {isEditing ? (
                <Select
                  value={formData.workPreference}
                  onValueChange={(value) => handleChange('workPreference', value)}
                >
                  <SelectTrigger className={`w-[200px] ${errors.workPreference ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectItem value="remote" className="hover:bg-gray-800">Remote Only</SelectItem>
                    <SelectItem value="hybrid" className="hover:bg-gray-800">Hybrid</SelectItem>
                    <SelectItem value="onsite" className="hover:bg-gray-800">On-site</SelectItem>
                    <SelectItem value="flexible" className="hover:bg-gray-800">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span className="bg-gray-50 rounded-full px-4 py-2 text-sm">
                  {formData.workPreference}
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Current: <strong>{formData.workPreference || "Not set"}</strong>
            </div>
            {errors.workPreference && <p className="text-red-500 text-sm">{errors.workPreference}</p>}
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Availability:</Label>
              {isEditing ? (
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleChange('availability', value)}
                >
                  <SelectTrigger className={`w-[200px] ${errors.availability ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectItem value="full-time" className="hover:bg-gray-800">Full Time</SelectItem>
                    <SelectItem value="part-time" className="hover:bg-gray-800">Part Time</SelectItem>
                    <SelectItem value="contract" className="hover:bg-gray-800">Contract</SelectItem>
                    <SelectItem value="freelance" className="hover:bg-gray-800">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span className="bg-gray-50 rounded-full px-4 py-2 text-sm">
                  {formData.availability}
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Current: <strong>{formData.availability || "Not set"}</strong>
            </div>
            {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Hourly Rate:</Label>
              {isEditing ? (
                <div className="relative w-[200px]">
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleChange('hourlyRate', parseFloat(e.target.value))}
                    className={`pr-16 ${errors.hourlyRate ? 'border-red-500' : ''}`}
                    min={10}
                    max={100}
                    placeholder="Enter rate"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    USD/hr
                  </span>
                </div>
              ) : (
                <span className="bg-gray-50 rounded-full px-4 py-2 text-sm">
                  {formData.hourlyRate} USD/hour
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Current: <strong>{formData.hourlyRate} USD/hour</strong>
            </div>
            {errors.hourlyRate && <p className="text-red-500 text-sm">{errors.hourlyRate}</p>}
          </div>

          {/* Right to Work */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Right to Work:</Label>
              {isEditing ? (
                <Input
                  value={formData.rightToWork}
                  onChange={(e) => handleChange('rightToWork', e.target.value)}
                  className={`w-[200px] ${errors.rightToWork ? 'border-red-500' : ''}`}
                  placeholder="e.g., Citizen, Work Permit"
                />
              ) : (
                <span className="bg-gray-50 rounded-full px-4 py-2 text-sm">
                  {formData.rightToWork || "Not set"}
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Current: <strong>{formData.rightToWork || "Not set"}</strong>
            </div>
            {errors.rightToWork && <p className="text-red-500 text-sm">{errors.rightToWork}</p>}
          </div>

          {/* Security Clearance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Security Clearance:</Label>
              {isEditing ? (
                <Input
                  value={formData.securityClearance}
                  onChange={(e) => handleChange('securityClearance', e.target.value)}
                  className={`w-[200px] ${errors.securityClearance ? 'border-red-500' : ''}`}
                  placeholder="e.g., None, Confidential, Top Secret"
                />
              ) : (
                <span className="bg-gray-50 rounded-full px-4 py-2 text-sm">
                  {formData.securityClearance || "Not set"}
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Current: <strong>{formData.securityClearance || "Not set"}</strong>
            </div>
            {errors.securityClearance && <p className="text-red-500 text-sm">{errors.securityClearance}</p>}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
        <Info className="h-4 w-4 inline mr-2" />
        Employers prefer candidates who specify clear preferences.
      </div>
    </div>
  )
}

