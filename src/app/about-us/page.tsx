'use client'
import { motion } from "framer-motion";
import { Award, BookOpen, Rocket, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Industry-Expert Mentors",
    description: "Learn directly from experienced professionals in the field"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Job-Ready Curriculum",
    description: "Curriculum designed to meet current industry demands"
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Real-World Projects",
    description: "Work on practical projects that matter"
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Practical-Based Learning",
    description: "Focus on hands-on experience over theory"
  }
];

const pricingPlans = [
  {
    name: "Quarterly Plan",
    price: "799",
    duration: "3 months",
    features: ["Basic mentorship", "Project reviews", "Community access"]
  },
  {
    name: "Six-Month Plan",
    price: "1,499",
    duration: "6 months",
    features: ["Priority mentorship", "Detailed project reviews", "Premium community access"]
  },
  {
    name: "Yearly Plan",
    price: "2,499",
    duration: "12 months",
    isPopular: true,
    features: ["Dedicated mentor", "Unlimited project reviews", "VIP community access"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
              Bridging Education & Industry with Skill Bridge
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Making learning more practical, job-ready, and perfectly aligned with industry needs. 
              Join us in revolutionizing education for the modern workforce.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
              >
                <Link href='sign-up'>
                Join the Revolution
                </Link>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Skill Bridge?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform offers a unique approach to learning that focuses on practical skills and industry relevance.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-blue-100/20 p-8 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-green-500/5 rounded-2xl" />
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-green-500 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-7xl lg:grid-cols-3"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative isolate rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 px-6 py-16 sm:px-16 md:py-20 lg:px-24"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Empower Your Workforce with Practical Learning
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-50">
                Join thousands of students and companies already benefiting from our practical learning approach.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-blue-50"
                >
                    <Link href='sign-up'>
                  Get Started Today
                  </Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;