"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import QRCodeImage from '/public/qr-code.jpg'; // Make sure to place your QR code image in the public folder

const PaymentPage: React.FC = () => {
  const [transactionId, setTransactionId] = useState<string>('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const upiId = '6263420394@ybl';

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshot(e.target.files[0]);
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

    if (!transactionId || !screenshot) {
      toast.error('Transaction ID and screenshot are required');
      return;
    }

    const formData = new FormData();
    formData.append('transactionId', transactionId);
    formData.append('screenshot', screenshot);

    try {
      setLoading(true);
      const response = await axios.post('/api/payments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      toast.success('Payment submitted successfully');
      router.push('/success-page');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-gray-900 text-orange-600">
      <ToastContainer />
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-600">Make a Payment</h1>
          <p className="mt-2 text-muted-foreground">Scan the QR code below and complete your payment</p>
        </div>
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
