import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto relative shadow-xl w-full md:w-auto overflow-y-auto max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 ease-in-out"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
