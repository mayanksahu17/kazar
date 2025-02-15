'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { UserCircle, Sparkles } from 'lucide-react'
import FormModal from '../formTest/ProfileForm/FormModal'

interface CompleteProfileButtonProps {
  profileData: any | null
  isLoading: boolean
}

export default function CompleteProfileButton({ profileData, isLoading }: CompleteProfileButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileIndex, setProfileIndex] = useState(0); // Track profile index if you have multiple profiles

  if (isLoading) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading your profile information...</p>
      </div>
    )
  }

  if (profileData && Object.keys(profileData).length > 0) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-transparent bg-clip-text">
        Let's Build Your Profile!
      </h2>

      <p className="text-lg text-muted-foreground text-center mb-8 max-w-md">
        Take the first step towards connecting with amazing opportunities. Complete your profile to showcase your skills and experience.
      </p>

      <div className="space-y-4 w-full max-w-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-500/90 hover:to-green-700 text-white font-bold py-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
                size="lg"
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Complete Your Profile
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start building your professional presence!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="text-sm text-muted-foreground text-center">
          🚀 Takes only a few minutes to complete
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profileIndex={profileIndex}/>
    </div>
  )
}