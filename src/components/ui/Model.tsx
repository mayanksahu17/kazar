// components/ui/Modal.tsx

import { ReactNode } from "react";
import { CiSquareRemove } from "react-icons/ci";


interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-gray-900 text-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Register</h2>
          <button
            className="text-gray-200 hover:text-gray-400"
            onClick={onClose}
          >
            <CiSquareRemove className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 bg-gray-800 text-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
