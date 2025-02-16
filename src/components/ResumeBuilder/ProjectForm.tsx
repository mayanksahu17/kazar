import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Project } from '../../types/resume';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  onSubmit: (data: { projects: Project[] }) => void;
  defaultValues?: { projects: Project[] };
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<{ projects: Project[] }>({
    defaultValues: defaultValues || {
      projects: [{ name: '', description: '', skillsUsed: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          type="button"
          onClick={() => append({ name: '', description: '', skillsUsed: [] })}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FolderGit2 className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Project #{index + 1}</h3>
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

          <div className="space-y-4">
            <div>
              <input
                {...register(`projects.${index}.name`, { required: 'Project name is required' })}
                placeholder="Project Name"
                className="w-full p-2 border rounded-md"
              />
              {errors.projects?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.projects[index]?.name?.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register(`projects.${index}.description`, { required: 'Description is required' })}
                placeholder="Project Description"
                rows={4}
                className="w-full p-2 border rounded-md"
              />
              {errors.projects?.[index]?.description && (
                <p className="text-red-500 text-sm">{errors.projects[index]?.description?.message}</p>
              )}
            </div>

            <div>
              <input
                {...register(`projects.${index}.skillsUsed`)}
                placeholder="Skills Used (comma-separated)"
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter skills separated by commas (e.g., React, TypeScript, Node.js)
              </p>
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