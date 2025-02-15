import React, { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { useUser } from '@clerk/nextjs';
import { CiLock } from 'react-icons/ci';
import FormModal from '../formTest/ProfileForm/FormModal';

const DashboardMain = ({ isPaidUser }: { isPaidUser: boolean }) => {
  const { user } = useUser();
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0); // Track profile index if you have multiple profiles

  return (
    <main className="w-full p-4 sm:p-6 bg-white rounded-lg shadow-md mt-10 sm:mt-16 pt-20 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
          <AvatarImage
            alt="Profile picture"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
            Hey {user?.firstName}, You're almost there!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Select a plan, team up with your associate, and start saving time
            right away.
          </p>
        </div>
      </div>

      {/* Explore Button Section */}


      {/* Steps Grid */}
      <div className="grid gap-6 mt-6 sm:mt-8">
        {/* Step 1 */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">
              1
            </span>
            <div className="flex-1 ml-4 border-t-2 border-dashed border-gray-300"></div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Unlock Access to Your Associate
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            See our impact on other clients,{' '}
            <Link className="text-blue-600 hover:underline" href="#">
              Testimonials
            </Link>
          </p>
          <Button className="mt-4 w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 shadow-md rounded-lg px-4 sm:px-6 py-2 sm:py-3">
            <a href="/pricing">Check Plan</a>
          </Button>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">
              2
            </span>
            <div className="flex-1 ml-4 border-t-2 border-dashed border-gray-300"></div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Onboarding Call
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            You will be greeted by your dedicated assistant
          </p>
          <Button
            disabled={!isPaidUser}
            className={`mt-4 w-full sm:w-auto ${
              !isPaidUser
                ? 'bg-gray-200 text-gray-500 border-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } shadow-md rounded-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center`}
          >
            <a
              href="https://apply.neetocal.com/meeting-with-nikhil-jain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Pick a Slot
              {!isPaidUser && <CiLock className="ml-2" />}
            </a>
          </Button>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">
              3
            </span>
            <div className="flex-1 ml-4 border-t-2 border-dashed border-gray-300"></div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Make sure your profile is complete to get the most out of our
            platform.
          </p>
          <Button
            onClick={() => setIsProfileFormOpen(true)}
            disabled={!isPaidUser}
            className={`mt-4 w-full sm:w-auto ${
              !isPaidUser
                ? 'bg-gray-200 text-gray-500 border-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } shadow-md rounded-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center`}
          >
            Complete Profile
            {!isPaidUser && <CiLock className="ml-2" />}
          </Button>
        </div>
      </div>

      {/* Profile Completion Modal */}
      <FormModal
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        profileIndex={profileIndex} // Ensure correct profileIndex is passed to the modal
      />
    </main>
  );
};

export default DashboardMain;
