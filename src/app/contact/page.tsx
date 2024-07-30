import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-500">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-300">
            We’d love to hear from you! Reach out to us for any queries, support, or feedback.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Get in Touch</h2>
            <p className="mt-2 text-gray-300">
              You can contact us via email at <a href="mailto:support@example.com" className="text-orange-400 hover:underline">support@example.com</a> or fill out the contact form below.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-orange-400">Contact Form</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300">Name</label>
                <input id="name" type="text" className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-2" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300">Email</label>
                <input id="email" type="email" className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-2" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300">Message</label>
                <textarea id="message" rows={4} className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-2" required></textarea>
              </div>
              <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-md">Send Message</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
