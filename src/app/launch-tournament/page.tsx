"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/utils/uploadthings';
import Link from 'next/link';

interface FormData {
  token: string;
  title: string;
  mode: string;
  map: string;
  winningPrice: number;
  rank1Price: number;
  rank2Price: number;
  rank3Price: number;
  eligibility: string;
  launchDate: string;
  time: string;
  requiredTeamSize: number;
  entryPrice: number;
  thumbnail: string;
}

const TournamentModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    token: "",
    title: '',    
    mode: 'none',
    map: 'none',
    winningPrice: 0,
    rank1Price: 0,
    rank2Price: 0,
    rank3Price: 0,
    eligibility: '',
    launchDate: '',
    time: '',
    requiredTeamSize: 0,
    entryPrice: 0,
    thumbnail: ''
  });

  const [errors, setErrors] = useState({
    mode: '',
    map: '',
    launchDate: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setFormData((prev) => ({ ...prev, token }));
  }, []);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === 'winningPrice' || id === 'rank1Price' || id === 'rank2Price' || id === 'rank3Price' || id === 'requiredTeamSize' || id === 'entryPrice'
        ? parseFloat(value)
        : value
    }));

    // Reset the corresponding error message on change
    setErrors((prev) => ({
      ...prev,
      [id]: '',
    }));
  };

  const validateForm = () => {
    const currentErrors = {
      mode: '',
      map: '',
      launchDate: '',
    };
    let isValid = true;

    // Date validation
    const currentDate = new Date();
    const selectedDate = new Date(formData.launchDate);
    if (!formData.launchDate || selectedDate < currentDate) {
      currentErrors.launchDate = 'Please enter a valid future date.';
      isValid = false;
    }

    // Mode validation
    if (formData.mode === 'none') {
      currentErrors.mode = 'Please select a mode.';
      isValid = false;
    }

    // Map validation
    if (formData.map === 'none') {
      currentErrors.map = 'Please select a map.';
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
          time: `${formData.launchDate}T${formData.time}:00Z`
        };
        
        const response = await axios.post('/api/tournament/createTournament', updatedFormData);

        if (response.status === 201) {
          toast.success('Tournament created successfully!');
          router.push('/');
        } else {
          toast.error('Failed to create tournament.');
        }
      }
    } catch (error) {
      toast.error('An error occurred while creating the tournament.');
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (id: keyof FormData, type: string, placeholder: string, value: string | number, error?: string) => (
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

  const renderSelectField = (id: keyof FormData, options: { value: string, label: string }[], error?: string) => (
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="mx-auto w-full max-w-md space-y-6 p-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-500">Launch The Tournament</h1>
            <p className="mt-2 text-gray-300">Enter your tournament details below</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {renderInputField('title', 'text', 'Title', formData.title)}
            {renderSelectField('mode', [
              { value: 'none', label: 'none' },
              { value: 'solo', label: 'Solo' },
              { value: 'squad', label: 'Squad' },
              { value: 'duo', label: 'Duo' }
            ], errors.mode)}
            {renderSelectField('map', [
              { value: 'none', label: 'none' },
              { value: 'miramar', label: 'Miramar' },
              { value: 'shanok', label: 'Shanok' },
              { value: 'vikendi', label: 'Vikendi' },
              { value: 'erangle', label: 'Erangle' },
              { value: 'livik', label: 'Livik' }
            ], errors.map)}
            {renderInputField('winningPrice', 'number', 'Pool Price', formData.winningPrice)}
            {renderInputField('rank1Price', 'number', '#1 Rank Price', formData.rank1Price)}
            {renderInputField('rank2Price', 'number', '#2 Rank Price', formData.rank2Price)}
            {renderInputField('rank3Price', 'number', '#3 Rank Price', formData.rank3Price)}
            <div>
              <Label htmlFor="eligibility">Eligibility and Rules</Label>
              <textarea
                id="eligibility"
                rows={7}
                placeholder="Description"
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-2 border rounded-lg text-white bg-gray-800"
              />
            </div>
            {renderInputField('launchDate', 'date', 'Launch Date', formData.launchDate, errors.launchDate)}
            {renderInputField('time', 'time', 'Launch Time', formData.time)}
            {renderInputField('requiredTeamSize', 'number', 'Required number of Teams', formData.requiredTeamSize)}
            {renderInputField('entryPrice', 'number', 'Entry Price per Team', formData.entryPrice)}
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
            <div className='flex text-blue-500'>
            <Input type='checkbox' className='h-4 w-4 mt-1 mr-2'/>
            <Link href = "/legaldocs/cancellation&refund" >
            I agree with Cancellation and Refund Policy
            </Link>
            </div>
           
          
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
                </div>
              ) : 'Create Tournament'}
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

export default TournamentModel;
