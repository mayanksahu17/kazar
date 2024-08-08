"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import QRCodeImage from '/public/qr-code.jpg'; // Ensure this path is correct

const PaymentPage: React.FC = ({ params }: any) => {
  const [transactionId, setTransactionId] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTournamentName , setTournamentName] = useState<string>("")
  const router = useRouter();
  const upiId = '6263420394@ybl';

  useEffect(() => {
   
    
    if (params.id) {
      const [team, amt] = (params.id as string).split('%2B');
      setSelectedTeam(team);
      setAmount(parseFloat(amt));
    }
  }, [params.id]);

  const uploadThumbnail = async () => {
    if (!image) {
      toast.error('No image selected for upload');
      return null;
    }

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

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      toast.success('UPI ID copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy UPI ID');
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionId || !image) {
      toast.error('Transaction ID and screenshot are required');
      return;
    }

    try {
      setLoading(true);

      // Upload image and proceed with form submission
      const uploadedImageUrl = await uploadThumbnail();
      if (!uploadedImageUrl) {
        throw new Error('Image upload failed');
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('/api/register-payment', {
        transactionId,
        imageUrl: uploadedImageUrl,
        amount,
        teamName: selectedTeam,
        token
      });

      toast.success('Payment details submitted successfully');
      setTimeout(()=>{

      },2000)
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-gray-900 text-orange-600">
        {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="text-white">Processing...</div>
        </div>
      )}
      <ToastContainer />
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-600">Make a Payment</h1>
          <p className="mt-2 text-muted-foreground">Scan the QR code below and complete your payment</p>
        </div>
        <span className='text-center flex ml-20'> Amount to be paid  :&nbsp; <h1 className='font-bold'> {"₹"}{amount}</h1> </span>
        <div className="flex justify-center">
          <Image src={QRCodeImage} alt="QR Code" width={200} height={200} />
        </div>
        <div className='text-center mt-4'>
          <p>Or send to this UPI ID</p>
          <p className="font-semibold">{upiId}</p>
          <Button onClick={handleCopyUPI} className="mt-2 text-orange-600 bg-green-950">
            Click to copy
          </Button>
        </div>
        <form className="space-y-4 text-orange-500 mt-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              id="transactionId"
              type="text"
              placeholder="Enter your transaction ID"
              value={transactionId}
              onChange={handleTransactionIdChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="screenshot">Upload Screenshot</Label>
            <Input
              id="screenshot"
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
              required
            />
          </div>
          <Button type="submit" className="w-full text-orange-600 bg-green-950" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
