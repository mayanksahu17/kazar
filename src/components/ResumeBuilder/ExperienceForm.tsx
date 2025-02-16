import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Experience } from '../../types/resume';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  onSubmit: (data: { experience: Experience[] }) => void;
  defaultValues?: { experience: Experience[] };
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<{ experience: Experience[] }>({
    defaultValues: defaultValues || {
      experience: [{ jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          type="button"
          onClick={() => append({ jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' })}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Experience #{index + 1}</h3>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register(`experience.${index}.jobTitle`, { required: 'Job title is required' })}
                placeholder="Job Title"
                className="w-full p-2 border rounded-md"
              />
              {errors.experience?.[index]?.jobTitle && (
                <p className="text-red-500 text-sm">{errors.experience[index]?.jobTitle?.message}</p>
              )}
            </div>

            <div>
              <input
                {...register(`experience.${index}.company`, { required: 'Company is required' })}
                placeholder="Company"
                className="w-full p-2 border rounded-md"
              />
              {errors.experience?.[index]?.company && (
                <p className="text-red-500 text-sm">{errors.experience[index]?.company?.message}</p>
              )}
            </div>

            <div>
              <input
                {...register(`experience.${index}.location`)}
                placeholder="Location"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  {...register(`experience.${index}.startDate`, { required: 'Start date is required' })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="text-red-500 text-sm">{errors.experience[index]?.startDate?.message}</p>
                )}
              </div>

              <div>
                <input
                  type="date"
                  {...register(`experience.${index}.endDate`)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <textarea
                {...register(`experience.${index}.description`, { required: 'Description is required' })}
                placeholder="Job Description"
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {errors.experience?.[index]?.description && (
                <p className="text-red-500 text-sm">{errors.experience[index]?.description?.message}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};