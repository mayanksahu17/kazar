import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Education } from '../../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  onSubmit: (data: { education: Education[] }) => void;
  defaultValues?: { education: Education[] };
}

export const EducationForm: React.FC<EducationFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<{ education: Education[] }>({
    defaultValues: defaultValues || {
      education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', current: false }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          type="button"
          onClick={() => append({ institution: '', degree: '', field: '', startDate: '', endDate: '', current: false })}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Education</span>
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Education #{index + 1}</h3>
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
                {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                placeholder="Institution"
                className="w-full p-2 border rounded-md"
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm">{errors.education[index]?.institution?.message}</p>
              )}
            </div>

            <div>
              <input
                {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                placeholder="Degree"
                className="w-full p-2 border rounded-md"
              />
              {errors.education?.[index]?.degree && (
                <p className="text-red-500 text-sm">{errors.education[index]?.degree?.message}</p>
              )}
            </div>

            <div>
              <input
                {...register(`education.${index}.field`, { required: 'Field of study is required' })}
                placeholder="Field of Study"
                className="w-full p-2 border rounded-md"
              />
              {errors.education?.[index]?.field && (
                <p className="text-red-500 text-sm">{errors.education[index]?.field?.message}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                {...register(`education.${index}.startDate`, { required: 'Start date is required' })}
                className="w-full p-2 border rounded-md"
              />
              {errors.education?.[index]?.startDate && (
                <p className="text-red-500 text-sm">{errors.education[index]?.startDate?.message}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                {...register(`education.${index}.endDate`)}
                className="w-full p-2 border rounded-md"
                disabled={field.current}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`education.${index}.current`)}
                className="rounded"
              />
              <label>Currently Studying</label>
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