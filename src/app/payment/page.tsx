"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentModal } from "@/components/companypayment/payment-modal"
import { PaymentSuccessModal } from "@/components/companypayment/payment-success-modal"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true)
  }

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setShowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    router.push("/success")
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back
      </Link>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-600">Confirm Your Purchase</CardTitle>
          <CardDescription>Review your plan details before proceeding to payment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Plan: Basic</p>
          <p>Price: $19.99/month</p>
          <ul className="list-disc list-inside mt-4">
            <li>Post Opportunities</li>
            <li>Search Students</li>
            <li>Access Dashboard</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={handleOpenPaymentModal} className="w-full bg-green-500 hover:bg-green-600">
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
      <PaymentModal isOpen={showPaymentModal} onClose={handleClosePaymentModal} onSuccess={handlePaymentSuccess} />
      <PaymentSuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />
    </div>
  )
}

