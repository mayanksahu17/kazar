"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    mobileNumber: ""
  });
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

  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_g1g3enpX7nMKYG";
  if (!key) throw new Error("Razorpay key is missing");

  const [errors, setErrors] = useState({
    mode: '',
    map: '',
    launchDate: '',
    checkbox: '',
    thumbnail: '', // Add thumbnail error
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      router.push("/sign-in");
    } else {
      setFormData((prev) => ({ ...prev, token }));
      setUserDetails({
        email: localStorage.getItem("email") || "",
        userName: localStorage.getItem("userName") || "",
        mobileNumber: localStorage.getItem("mobileNumber") || ""
      });
    }
  }, [router]);

  const uploadThumbnail = async (url: string) => {
    try {
      setImageUrl(url);
      toast.success('Image uploaded successfully!');
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
      [id]: ['winningPrice', 'rank1Price', 'rank2Price', 'rank3Price', 'requiredTeamSize', 'entryPrice'].includes(id)
        ? parseFloat(value)
        : value
    }));

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
      mode: '',
      map: '',
      launchDate: '',
      checkbox: '',
      thumbnail: '', // Add thumbnail error
    };
    let isValid = true;
  
    const currentDate = new Date();
    const selectedDate = new Date(formData.launchDate);
    if (!formData.launchDate || selectedDate < currentDate) {
      currentErrors.launchDate = 'Please enter a valid future date.';
      isValid = false;
    }
  
    if (formData.mode === 'none') {
      errors.mode = 'Please select a mode.';
      isValid = false;
    }
  
    if (formData.map === 'none') {

      currentErrors.map = 'Please select a map.';
      
      isValid = false;
    }
  
    if (!isChecked) {
      currentErrors.checkbox = 'You must agree with the Cancellation and Refund Policy.';
      isValid = false;
    }
  
    // Add thumbnail validation
    if (!imageUrl) {
      currentErrors.thumbnail = 'Please upload a thumbnail for the tournament.';
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

        if ((updatedFormData.rank1Price + updatedFormData.rank2Price + updatedFormData.rank3Price) !== updatedFormData.winningPrice) {
          toast.error('The pool amount is not valid for all ranks.');
        } else {
          const response = await axios.put('/api/tournament/createTournament', updatedFormData);
          
          if (response.status === 200) {
            const order = response.data.order;
            const options = {
              key,
              name: "Scrims Crown",
              currency: order.currency,
              amount: order.amount,
              order_id: order.id,
              description: "Tournament Payment",
              image: "https://utfs.io/f/b20ac6fe-f3d3-4df6-998a-2084302d59e6-apa690.png",
              handler: async (response: any) => {  
                const res = await axios.post('/api/tournament/createTournament', updatedFormData);
                if (res.status === 201) {
                  toast.success('Tournament created successfully!');
                  router.push('/');
                } else {
                  toast.error('Failed to create tournament.');
                }
              },
              prefill: {
                name: userDetails.userName,
                email: userDetails.email,
                contact: userDetails.mobileNumber,
              },
              theme: {
                color: "#3399cc",
              },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
      
            paymentObject.on("payment.failed", () => {
              toast.error("Payment failed. Please try again.");
            });
          } else {
            toast.error('Failed to create tournament.');
          }
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
    <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
            {renderInputField('time', 'time', 'Launch Time', formData.time)}
            {renderInputField('requiredTeamSize', 'number', 'Required number of Teams', formData.requiredTeamSize)}
            {renderInputField('entryPrice', 'number', 'Entry Price per Team', formData.entryPrice)}
           
            <div className='flex text-blue-500'>
              <Input 
                type='checkbox' 
                className='h-4 w-4 mt-1 mr-2' 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
               <Label htmlFor="terms" className="ml-2 text-gray-300">
                I agree to the{' '}
                <Link href="/refund-cancellation" className="text-orange-500 hover:text-orange-700">
                  Cancellation and Refund Policy
                </Link>
              </Label>
            </div>
            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Launch'}
              </Button>
              <Button
                type="button"
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}

          </form>
        </div>
      </div>
    </>
  );
};

export default TournamentModel;