import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-500">Terms of Service</h1>
          <p className="mt-4 text-xl text-gray-300">
            Please read these terms of service carefully before using our platform.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Introduction</h2>
            <p className="mt-2 text-gray-300">
              By accessing or using our platform, you agree to comply with and be bound by these terms of service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">User Responsibilities</h2>
            <p className="mt-2 text-gray-300">
              You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Limitation of Liability</h2>
            <p className="mt-2 text-gray-300">
              We are not liable for any indirect, incidental, or consequential damages arising from the use of our platform.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Changes to Terms</h2>
            <p className="mt-2 text-gray-300">
              We may update these terms from time to time. We will notify you of any changes by posting the new terms on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
