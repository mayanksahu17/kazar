import React from 'react';
import { useForm } from 'react-hook-form';
import { PersonalInfo } from '../../types/resume';
import { User, Mail, Phone, Linkedin, MapPin, Github, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfo) => void;
  defaultValues?: PersonalInfo;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('fullName', { required: 'Full name is required' })}
              placeholder="Full Name"
              className="w-full p-2 border rounded-md"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            }
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Mail className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Email"
              type="email"
              className="w-full p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            }
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="Phone Number"
              className="w-full p-2 border rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            }
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Linkedin className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('linkedin')}
              placeholder="LinkedIn URL (Optional)"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('location')}
              placeholder="Location (Optional)"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Github className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('github')}
              placeholder="GitHub URL (Optional)"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Globe className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <input
              {...register('portfolio')}
              placeholder="Portfolio URL (Optional)"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Next Step
      </button>
    </form>
  );
};