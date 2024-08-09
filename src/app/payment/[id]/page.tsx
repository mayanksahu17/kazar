"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Loading from "@/components/Loading";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = ({ params }: any) => {
  const [amount, setAmount] = useState(0);
  const [tournamentName, setTournamentName] = useState<string>("");
  const [teamName, setTeamName] =useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
     
      const amt = (params.id as string)
      const team_L = localStorage.getItem("team") as string
      const tName_L = localStorage.getItem("tName") as string
      setTeamName(team_L);
      setTournamentName(tName_L);
      setAmount(parseFloat(amt));
    }
  }, [params.id]);

  const makePayment = async () => {
    try {
      setIsProcessing(true);
      const key = process.env.RAZOR_PAY_KEY_ID || "rzp_test_g1g3enpX7nMKYG";
      
      
      if (!key) throw new Error("Razorpay key is missing");

      const payload = {
        amount,
        teamName,
        token: localStorage.getItem("token"),
        tournamentName,
      };

      const { data } = await axios.post("/api/payment/register-payment", payload);
      const order = data.order;
      let res;
      const options = {
        key: key,
        name: "mmantratech",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: "Tournament Payment",
        handler: async (response: any) => {

          
          try {
             res = await axios.post("/api/payment/confirm-payment", {
              ...payload,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (res.status === 200) {
              toast.success("You are registered for the tournament!");
              localStorage.setItem("team","")
              localStorage.setItem("tName","")
              router.push("/");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error("An error occurred during payment verification.");
          }
        },
        prefill: {
          name: "Mayank sahu",
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
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <div className="flex flex-col items-center min-h-screen bg-gray-900">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white">Payment Page</h1>
            <p className="mb-4 text-white">Amount to pay: ₹{amount}</p>
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
        </div>
      </Suspense>
    </>
  );
};

export default PaymentPage;
