"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
    mode: '',
    map: '',
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

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setFormData((prev) => ({ ...prev, token }));
  }, []);

  const uploadThumbnail = async () => {
    if (!image) return null;

    try {
      const formData = new FormData();
      formData.append('Image', image);

      const response = await axios.post(
        'https://printovert-backend.onrender.com/api/v1/users/cloudinary/v2/upload/outService',
        formData
      );

      setImageUrl(response.data.URL);
      return response.data.URL;
    } catch (error) {
      toast.error('Failed to upload image.');
      return null;
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.type === 'file' && e.target instanceof HTMLInputElement) {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    } else {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: id === 'winningPrice' || id === 'rank1Price' || id === 'rank2Price' || id === 'rank3Price' || id === 'requiredTeamSize' || id === 'entryPrice'
          ? parseFloat(value)
          : value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const thumbnailUrl = await uploadThumbnail();
      if (thumbnailUrl) {
        const updatedFormData = {
          ...formData,
          thumbnail: thumbnailUrl,
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

  const renderInputField = (id: keyof FormData, type: string, placeholder: string, value: string | number) => (
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
    </div>
  );

  const renderSelectField = (id: keyof FormData, options: { value: string, label: string }[]) => (
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
              { value: 'solo', label: 'Solo' },
              { value: 'squad', label: 'Squad' },
              { value: 'duo', label: 'Duo' }
            ])}
            {renderSelectField('map', [
              { value: 'miramar', label: 'Miramar' },
              { value: 'shanok', label: 'Shanok' },
              { value: 'vikendi', label: 'Vikendi' },
              { value: 'erangle', label: 'Erangle' },
              { value: 'livik', label: 'Livik' }
            ])}
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
            {renderInputField('launchDate', 'date', 'Launch Date', formData.launchDate)}
            {renderInputField('time', 'time', 'Launch Time', formData.time)}
            {renderInputField('requiredTeamSize', 'number', 'Required number of Teams', formData.requiredTeamSize)}
            {renderInputField('entryPrice', 'number', 'Entry Price per Team', formData.entryPrice)}
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                id="thumbnail"
                type="file"
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? 'Creating...' : 'Create Tournament'}
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
