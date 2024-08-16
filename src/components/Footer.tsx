import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-orange-500">BGMI Tournament Platform</h2>
          <p className="mt-2 text-gray-300">The best place to compete in BGMI tournaments.</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          <Link href="/about" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer mb-2 md:mb-0">About Us</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer mb-2 md:mb-0">Contact</span>
          </Link>
          <Link href="/legaldocs/terms-of-service" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer mb-2 md:mb-0">Terms and Conditions </span>
          </Link>
          <Link href="/legaldocs/privacy" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer">Privacy Policy</span>
          </Link>
          <Link href="/legaldocs/cancellation&refund" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer">Cancellation and Refund Policy</span>
          </Link>
          <Link href="/legaldocs/shippingandDelivery" passHref>
            <span className="text-gray-300 hover:text-orange-500 cursor-pointer">Shipping and Delivery Policy</span>
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400">&copy; 2024 BGMI Tournament Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
