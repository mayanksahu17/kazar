'use client';

import { useAuth } from '@clerk/nextjs';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import PerspectiveCards  from './perspective';
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
];

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const PricingUser = () => {
  const { userId } = useAuth();

  const plans = [
    {
      name: 'Basic',
      price: '199',
      priceId: 'price_1PJR4wACYURR6mEK5da3Kp4H',
      originalPrice: '300',
      savings: '100',
      features: [
        { name: '250 Job applications', enabled: true },
        { name: '1 Assistant', enabled: true },
        { name: 'Cold Emails', enabled: false },
        { name: 'Resume Review', enabled: false },
        { name: 'Custom Cover Letters', enabled: false },
        { name: 'Custom Resumes', enabled: false },
        { name: 'LinkedIn Makeover', enabled: false },
        { name: 'Mock Interviews', enabled: false },
      ],
      link: 'https://buy.stripe.com/test_6oE6rk8cA1ujdO07sz',
    },
    {
      name: 'Standard',
      price: '250',
      priceId: 'price_1PJR4BACYURR6mEKuJOVMN2h',
      originalPrice: '400',
      savings: '150',
      features: [
        { name: '350 Job applications', enabled: true },
        { name: '1 Assistant', enabled: true },
        { name: '50 Cold Emails', enabled: true },
        { name: 'Resume Review', enabled: true },
        { name: 'Custom Cover Letters', enabled: false },
        { name: 'Custom Resumes', enabled: false },
        { name: 'LinkedIn Makeover', enabled: false },
        { name: 'Mock Interviews', enabled: false },
      ],
      link: 'https://buy.stripe.com/test_8wM7vogJ62ynh0c7sy',
    },
    {
      name: 'Best Value',
      price: '350',
      priceId: 'price_1PJR0yACYURR6mEKGfNb2i7y',
      originalPrice: '500',
      savings: '150',
      features: [
        { name: '800 Job applications', enabled: true },
        { name: '2 Assistant', enabled: true },
        { name: '200 Cold Emails', enabled: true },
        { name: 'Resume Review', enabled: true },
        { name: 'Custom Cover Letters', enabled: true },
        { name: 'Custom Resumes', enabled: true },
        { name: 'LinkedIn Makeover', enabled: true },
        { name: '2 Mock Interviews', enabled: true },
      ],
      link: 'https://buy.stripe.com/test_00g7voeAYb4TeS4fZ3',
    },
    {
      name: 'Ultimate Bundle',
      price: '500',
      priceId: 'price_1PJQxKACYURR6mEKI4UKv8lw',
      originalPrice: '700',
      savings: '200',
      features: [
        { name: '1200 Job applications', enabled: true },
        { name: '3 Assistant', enabled: true },
        { name: '500 Cold Emails', enabled: true },
        { name: 'Resume Review', enabled: true },
        { name: 'Custom Cover Letters', enabled: true },
        { name: 'Custom Resumes', enabled: true },
        { name: 'LinkedIn Makeover', enabled: true },
        { name: '5 Mock Interviews', enabled: true },
      ],
      link: 'https://buy.stripe.com/test_aEUg1UboMgpd4dq9AE',
    },
  ];

  const handleStripeCheckout = async ({ id, checkOutDetails }: any) => {
    if (!id) {
      alert('Please login to continue buying!');
    }
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe.js has not loaded properly.');
      return;
    }
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: checkOutDetails.priceId,
        metadata: { ...checkOutDetails, userId: id },
      }),
    });
    console.log(response);

    if (response.ok) {
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Failed to create checkout session');
    }
  };

  return (
    <div className="min-h-screen text-black" style={{ backgroundColor: '#FAF6F6', paddingTop: '4rem' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-10 flex items-center justify-center">
          <span>Pricing Plans</span>
          <div className="flex items-center ml-4">
            <AnimatedTooltip items={people} />
          </div>
        </h2>
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border ${
                plan.name === 'Ultimate Bundle' 
                  ? 'border-[#4a4a4a] bg-[#1a1a1a] transform scale-105 shadow-2xl' 
                  : 'border-gray-200 bg-white'
              } shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg leading-6 font-medium ${plan.name === 'Ultimate Bundle' ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  {plan.savings && (
                    <span className={`text-sm font-semibold ${plan.name === 'Ultimate Bundle' ? 'text-green-400' : 'text-green-600'}`}>
                      Save ${plan.savings}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline mt-4">
                  <p className={`text-4xl font-extrabold ${plan.name === 'Ultimate Bundle' ? 'text-white' : 'text-gray-900'} mr-2`}>
                    ${plan.price}
                  </p>
                  {plan.originalPrice && (
                    <p className="text-lg text-gray-400 line-through">
                      ${plan.originalPrice}
                    </p>
                  )}
                </div>
                <ul className="mt-6 space-y-4 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className={`flex items-center ${plan.name === 'Ultimate Bundle' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature.enabled ? (
                        <>
                          <span className="text-green-400 mr-2">✓</span>
                          {feature.name}
                        </>
                      ) : (
                        <>
                          <span className="text-red-400 mr-2">✕</span>
                          {feature.name}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleStripeCheckout({ id: userId, checkOutDetails: plan })}
                  className={`mt-6 inline-block w-full text-center font-bold py-3 px-6 rounded-lg border border-transparent ${
                    plan.name === 'Ultimate Bundle'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700'
                      : 'bg-[#dedede] text-black hover:bg-gray-200'
                  } shadow-sm transition-all duration-300`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PerspectiveCards />
      <Footer />
    </div>
  );
};

export default PricingUser;

