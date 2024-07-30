"use client";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { time } from 'console';

const TournamentModel = ({ value, ...props }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    token: "",
    title: '',
    mode: '',
    map: '',
    winningPrice: '',
    eligibility: '',
    owner: '',
    launchDate: '',
    time : "",
    requiredTeamSize: '',
    entryPrice: '',
    thumbnail: ''
  });

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
      console.log(response.data.URL);
      
      return response.data.URL;
    } catch (error) {
      toast.error('Failed to upload image.');
      return null;
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const thumbnailUrl = await uploadThumbnail();
      let token =   localStorage.getItem("token") || "";
      if (thumbnailUrl) {
        setFormData({
          ...formData,
          token: token,
          thumbnail: thumbnailUrl
        });
        console.log({...formData, thumbnailUrl});
        
        // Replace with your API endpoint
        const response = await axios.post('/api/createTournament', { ...formData, thumbnail: thumbnailUrl });

        if (response.status === 201) {
          toast.success('Tournament created successfully!');
          router.push('/'); // Redirect to the tournaments page or any other page
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
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter the title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="mode">Mode</Label>
              <Input
                id="mode"
                type="text"
                placeholder="Enter the mode"
                value={formData.mode}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="map">Map</Label>
              <Input
                id="map"
                type="text"
                placeholder="Enter the map"
                value={formData.map}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="winningPrice">Winning Price</Label>
              <Input
                id="winningPrice"
                type="text"
                placeholder="Enter the winning price"
                value={formData.winningPrice}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="eligibility">Eligibility</Label>
              <Input
                id="eligibility"
                type="text"
                placeholder="Enter the eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                type="text"
                placeholder="Enter the owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="launchDate">Launch Date</Label>
              <Input
                id="launchDate"
                type="date"
                placeholder="Enter the launch date"
                value={formData.launchDate}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div> 
            <div>
              <Label htmlFor="time">Launch day Time </Label>
              <Input
                id="time"
                type="time"
                placeholder="Enter the launch time"
                value={formData.time}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div> 
            <div>
              <Label htmlFor="requiredTeamSize">Required Team Size</Label>
              <Input
                id="requiredTeamSize"
                type="number"
                placeholder="Enter the required team size"
                value={formData.requiredTeamSize}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                placeholder="Enter the entry price"
                value={formData.entryPrice}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
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
