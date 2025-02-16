import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Skill } from '../../types/resume';
import { Wrench, Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  onSubmit: (data: { skills: Skill[] }) => void;
  defaultValues?: { skills: Skill[] };
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<{ skills: Skill[] }>({
    defaultValues: defaultValues || {
      skills: [{ name: '', rating: 1, category: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const categories = [
    'Programming Languages',
    'Frameworks',
    'Databases',
    'Tools',
    'Soft Skills',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={() => append({ name: '', rating: 1, category: '' })}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Skill</span>
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Skill #{index + 1}</h3>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                {...register(`skills.${index}.name`, { required: 'Skill name is required' })}
                placeholder="Skill Name"
                className="w-full p-2 border rounded-md"
              />
              {errors.skills?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.skills[index]?.name?.message}</p>
              )}
            </div>

            <div>
              <select
                {...register(`skills.${index}.category`, { required: 'Category is required' })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.skills?.[index]?.category && (
                <p className="text-red-500 text-sm">{errors.skills[index]?.category?.message}</p>
              )}
            </div>

            <div>
              <input
                type="range"
                min="1"
                max="5"
                {...register(`skills.${index}.rating`, { 
                  required: 'Rating is required',
                  min: 1,
                  max: 5
                })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
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