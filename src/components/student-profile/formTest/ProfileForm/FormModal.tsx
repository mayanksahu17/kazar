import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import MultiStepForm from "./MultiStepForm";
import { X } from "lucide-react"; // Assuming you're using Lucide icons

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileIndex: number;
}

export default function FormModal({ isOpen, onClose, profileIndex }: FormModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent the modal from closing on overlay click
  };

  return (
    <Dialog open={isOpen}>
      {/* Background Overlay with blur */}
      <DialogOverlay
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[110]"
      />

      {/* Centered Modal Content */}
      <DialogContent
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full max-h-screen overflow-y-auto bg-white shadow-lg rounded-lg p-6 z-[120] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      >
        {/* Cancel Icon */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Multi-Step Form */}
        <MultiStepForm onClose={onClose} profileIndex={profileIndex} />
      </DialogContent>
    </Dialog>
  );
}
