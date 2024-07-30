import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-500">Privacy Policy</h1>
          <p className="mt-4 text-xl text-gray-300">
            Your privacy is important to us. This privacy policy explains how we collect, use, and disclose your information.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Information We Collect</h2>
            <p className="mt-2 text-gray-300">
              We collect information you provide directly to us, such as when you create an account, participate in a tournament, or contact us for support.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">How We Use Your Information</h2>
            <p className="mt-2 text-gray-300">
              We use the information to provide and improve our services, communicate with you, and ensure the security of our platform.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Data Security</h2>
            <p className="mt-2 text-gray-300">
              We implement reasonable security measures to protect your information from unauthorized access and use.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Your Choices</h2>
            <p className="mt-2 text-gray-300">
              You may access, update, or delete your personal information at any time by contacting us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
