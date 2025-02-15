import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import UploadPhotoButton from '@/components/buttons/upload-button';
import { Schema } from 'mongoose';

const ProfileSchema = new Schema({
  personalInfo: {
    fullName: { type: String, required: true, default: '' },
    profilePhoto: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    postcode: { type: String, required: false, default: '' },
    englishLevel: { type: String, required: false, default: '' },
    location: { type: String, required: true, default: '' },
    address: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
  }
});

interface PersonalInfoProps {
  form: UseFormReturn<any>;
  profileIndex: number;
}

export default function PersonalInfo({ form, profileIndex }: PersonalInfoProps) {
  const { register, setValue, formState: { errors }, trigger } = form;
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    register(`profiles.${profileIndex}.personalInfo.profilePhoto`, { 
      required: 'Profile photo is required' 
    });
  }, [register, profileIndex]);

  useEffect(() => {
    if (profilePhotoUrl) {
      setValue(`profiles.${profileIndex}.personalInfo.profilePhoto`, profilePhotoUrl);
      trigger(`profiles.${profileIndex}.personalInfo.profilePhoto`);
    }
  }, [profilePhotoUrl, setValue, trigger, profileIndex]);

  return (
    <div className="space-y-4">
      {/* Profile Photo Section */}
      <div>
        <Label>Profile Photo</Label>
        <UploadPhotoButton
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              setProfilePhotoUrl(res[0].url);
              setUploadSuccess(true);
            }
          }}
          onUploadError={(error: Error) => {
            console.error(error);
            setUploadSuccess(false);
          }}
        />
        {profilePhotoUrl && (
          <div className="mt-2">
            <img
              src={profilePhotoUrl}
              alt="Profile Photo Preview"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
        )}
        {errors.profiles?.[profileIndex]?.personalInfo?.profilePhoto && (
          <p className="text-red-500 text-sm mt-2">
            {errors.profiles[profileIndex].personalInfo.profilePhoto.message}
          </p>
        )}
      </div>

      {/* Full Name Field */}
      <div>
        <Label htmlFor={`profiles.${profileIndex}.personalInfo.fullName`}>Full Name</Label>
        <Input
          id={`profiles.${profileIndex}.personalInfo.fullName`}
          {...register(`profiles.${profileIndex}.personalInfo.fullName`, {
            required: 'Full name is required',
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Full name can only contain letters and spaces'
            }
          })}
        />
        {errors.profiles?.[profileIndex]?.personalInfo?.fullName && (
          <p className="text-red-500 text-sm">{errors.profiles[profileIndex].personalInfo.fullName.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <Label htmlFor={`profiles.${profileIndex}.personalInfo.email`}>Email</Label>
        <Input
          id={`profiles.${profileIndex}.personalInfo.email`}
          type="email"
          {...register(`profiles.${profileIndex}.personalInfo.email`, {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email (e.g., user@example.com)'
            }
          })}
        />
        {errors.profiles?.[profileIndex]?.personalInfo?.email && (
          <p className="text-red-500 text-sm">{errors.profiles[profileIndex].personalInfo.email.message}</p>
        )}
      </div>

      {/* Location Field */}
      <div>
        <Label htmlFor={`profiles.${profileIndex}.personalInfo.location`}>Location</Label>
        <Input
          id={`profiles.${profileIndex}.personalInfo.location`}
          {...register(`profiles.${profileIndex}.personalInfo.location`, {
            required: 'Location is required',
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Location can only contain letters and spaces'
            }
          })}
          list="locations"
        />
        <datalist id="locations">
          <option value="New York" />
          <option value="California" />
          <option value="Seattle" />
          <option value="Boston" />
          <option value="Chicago" />
        </datalist>
        {errors.profiles?.[profileIndex]?.personalInfo?.location && (
          <p className="text-red-500 text-sm">{errors.profiles[profileIndex].personalInfo.location.message}</p>
        )}
      </div>

      {/* Street Address Field */}
      <div>
        <Label htmlFor={`profiles.${profileIndex}.personalInfo.address`}>Street Address</Label>
        <Input
          id={`profiles.${profileIndex}.personalInfo.address`}
          {...register(`profiles.${profileIndex}.personalInfo.address`, {
            required: 'Street address is required',
            pattern: {
              value: /^[0-9a-zA-Z\s,.-]+$/,
              message: 'Please enter a valid street address (e.g., 123 Main St, Apt 4)'
            }
          })}
          placeholder="e.g., 123 Main Street, Apt 4"
        />
        {errors.profiles?.[profileIndex]?.personalInfo?.address && (
          <p className="text-red-500 text-sm">{errors.profiles[profileIndex].personalInfo.address.message}</p>
        )}
      </div>

      {/* Phone Number Field */}
      <div>
        <Label htmlFor={`profiles.${profileIndex}.personalInfo.phone`}>Phone Number</Label>
        <Input
          id={`profiles.${profileIndex}.personalInfo.phone`}
          {...register(`profiles.${profileIndex}.personalInfo.phone`, {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number'
            }
          })}
        />
        {errors.profiles?.[profileIndex]?.personalInfo?.phone && (
          <p className="text-red-500 text-sm">{errors.profiles[profileIndex].personalInfo.phone.message}</p>
        )}
      </div>
    </div>
  );
}

