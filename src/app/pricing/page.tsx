"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation"

// Define pricing plans outside the component to avoid re-creation on each render
const pricingPlans = [
  {
    name: "Quarterly Plan",
    price: "10,000",
    duration: "3 months",
    features: ["Post Opportunities", "Community access"]
  },
  {
    name: "Six-Month Plan",
    price: "16,000",
    duration: "6 months",
    features: ["Post Opportunities + Hackathons ", "Detailed project reviews", "Premium community access"]
  },
  {
    name: "Yearly Plan",
    price: "32,000",
    duration: "12 months",
    isPopular: true,
    features: ["Job Postings", "Student Dashboard premium access", "VIP community access"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PricingPage() {
  const router = useRouter()
  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back
      </Link>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pricing Plans
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the perfect plan for your learning journey
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-7xl lg:grid-cols-3"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border ${
                  plan.isPopular ? 'border-blue-200' : 'border-blue-100/20'
                } p-8 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-green-500/5 rounded-2xl" />
                <div className="relative">
                  {plan.isPopular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-green-500">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/{plan.duration}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-x-2 text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                  onClick={() => {router.push("/payment")}}
                    className={`mt-8 w-full ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}