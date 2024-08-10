"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Loading from "@/components/Loading";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentPageProps {
  params: {
    id: string;
  };
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const [amount, setAmount] = useState<number>(0);
  const [tournamentName, setTournamentName] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [loading,setLoading] = useState(false)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const storedTeamName = localStorage.getItem("team");
      const storedTournamentName = localStorage.getItem("tName");
      if (storedTeamName) setTeamName(storedTeamName);
      if (storedTournamentName) setTournamentName(storedTournamentName);
      setAmount(parseFloat(params.id));
    }
  }, [params.id]);

  const makePayment = async () => {
    setIsProcessing(true);

    try {
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_g1g3enpX7nMKYG";
      if (!key) throw new Error("Razorpay key is missing");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const payload = {
        amount,
        teamName,
        token,
        tournamentName,
      };

      const { data } = await axios.post("/api/tournament/register-tournament", payload);
      const order = data.order;

      const options = {
        key,
        name: "Mayank Sahu",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: "Tournament Payment",
        handler: async (response: any) => {
          try {
            setLoading(true)
            const res = await axios.post("/api/payment/confirm-payment", {
              ...payload,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (res.status === 200) {
              toast.success("You are registered for the tournament!");
              setIsPaymentSuccessful(true);
              clearLocalStorage();
              setLoading(false)
              router.push("/");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            handlePaymentError(error, "Payment verification failed.");
          }
        },
        prefill: {
          name: "Mayank Sahu",
          email: "mayanksahu0024@gmail.com",
          contact: "6263420394",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", (response: any) => {
        toast.error("Payment failed. Please try again.");
      });
    } catch (error) {
      clearLocalStorage()
      handlePaymentError(error, "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: unknown, message: string) => {
    console.error(error);
    clearLocalStorage()
    toast.error(message);
    setIsProcessing(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("team");
    localStorage.removeItem("tName");
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <div className="flex flex-col items-center min-h-screen bg-gray-900">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          <div className="p-6 bg-gray-800 rounded-lg shadow-md mt-24">
            <h1 className="text-2xl font-bold mb-4 text-white">Payment Page</h1>
            <p className="mb-4 text-white">Tournament: {tournamentName}</p>
            <p className="mb-4 text-white">Entry price to pay: ₹{amount}</p>
            <button
              onClick={makePayment}
              disabled={isProcessing}
              className={`px-4 py-2 rounded text-white ${
                isProcessing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
          {isPaymentSuccessful && (
            <p className="mb-4 text-green-500 font-semibold">
              Payment successfully completed. You will be redirected to the dashboard.
            </p>
          ) }
          {loading && (
            <p className="mb-4 text-green-500 font-semibold">
              Please hold on !
              <br />
             Sending the confirmation Email to the User...
            </p>
          ) }
        </div>
      </Suspense>
    </>
  );
};

export default PaymentPage;
