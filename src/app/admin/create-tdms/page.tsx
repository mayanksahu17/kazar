"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { UploadButton } from '@/utils/uploadthings';
import Link from 'next/link';

interface FormData {
  name: string;
  entryPrice: number;
  winningPrice: number;
  Weapon: string;
  launchDate: string;
  thumbnail: string;
  time: string; // Added time field to the FormData interface
}

const CreateTdmPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',    
    entryPrice: 0,
    winningPrice: 0,
    Weapon: 'any',
    launchDate: '',
    thumbnail: '',
    time: '' // Initialize time field
  });

  const [errors, setErrors] = useState({
    launchDate: '',
    checkbox: '',
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const uploadThumbnail = async (url: string) => {
    try {
      setImageUrl(url);
    } catch (error) {
      toast.error('Failed to upload image.');
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === 'entryPrice' || id === 'winningPrice' ? parseFloat(value) : value,
    }));

    // Reset the corresponding error message on change
    setErrors((prev) => ({
      ...prev,
      [id]: '',
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setErrors((prev) => ({
      ...prev,
      checkbox: '',
    }));
  };

  const validateForm = () => {
    const currentErrors = {
      launchDate: '',
      checkbox: '',
    };
    let isValid = true;

    // Date validation
    const currentDate = new Date();
    const selectedDate = new Date(formData.launchDate);

    if (!formData.launchDate || selectedDate < currentDate) {
      currentErrors.launchDate = 'Please enter a valid future date.';
      isValid = false;
    }

    // Time validation
    if (!formData.time) {
      currentErrors.launchDate = 'Please select a valid time.';
      isValid = false;
    }

    // Checkbox validation
    if (!isChecked) {
      currentErrors.checkbox = 'You must agree with the Cancellation and Refund Policy.';
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (imageUrl) {
        const updatedFormData = {
          ...formData,
          thumbnail: imageUrl,
        };

        const response = await axios.post('/api/tdm/createTDM', updatedFormData);

        if (response.status === 201) {
          toast.success('TDM created successfully!');
          router.push('/');
        } else {
          toast.error('Failed to create TDM.');
        }
      }
    } catch (error) {
      toast.error('An error occurred while creating the TDM.');
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (
    id: keyof FormData, 
    type: string, 
    placeholder: string, 
    value: string | number, 
    error?: string
  ) => (
    <div>
      <Label htmlFor={id}>{placeholder}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-700 text-white"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

  const renderSelectField = (
    id: keyof FormData, 
    options: { value: string, label: string }[], 
    error?: string
  ) => (
    <div>
      <Label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
      <select
        id={id}
        value={formData[id]}
        onChange={handleChange}
        className="w-full rounded p-1 bg-gray-800 text-white border"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="mx-auto w-full max-w-md space-y-6 p-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-500">Create a TDM</h1>
            <p className="mt-2 text-gray-300">Enter TDM details below</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {renderInputField('name', 'text', 'TDM Name', formData.name)}
            {renderInputField('entryPrice', 'number', 'Entry Price', formData.entryPrice)}
            {renderInputField('winningPrice', 'number', 'Winning Price', formData.winningPrice)}
            {renderSelectField('Weapon', [
              { value: 'any', label: 'Any' },
              { value: 'sniper', label: 'Sniper' },
              { value: 'shotgun', label: 'Shotgun' },
              { value: 'smg', label: 'SMG' },
              { value: 'AR', label: 'AR' },
            ])}
            {renderInputField('time', 'time', 'Launch Time', formData.time)}  {/* Added time field */}
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <UploadButton
               endpoint='imageUploader'
               onClientUploadComplete={async(res) => {
                await uploadThumbnail(res[0].url);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
               />
            </div>
            {renderInputField('launchDate', 'date', 'Launch Date', formData.launchDate, errors.launchDate)}
            <div className='flex text-blue-500'>
              <Input 
                type='checkbox' 
                className='h-4 w-4 mt-1 mr-2' 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              <Link href="/legaldocs/cancellation&refund">
                I agree with the Cancellation and Refund Policy
              </Link>
            </div>
            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
                </div>
              ) : 'Create TDM'}
            </Button>
            <Button type="button" onClick={handleCancel} className="w-full bg-gray-600 hover:bg-gray-700">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTdmPage;
