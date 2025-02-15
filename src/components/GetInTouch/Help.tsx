import React, { useState } from 'react';

const Help = () => {
  const [formData, setFormData] = useState({
    'entry.1604801949': '', // Name field ID
    'entry.1888786998': '', // Email field ID
    'entry.74727464': '', // Mobile Number field ID
    'entry.1690397815': '', // Message field ID
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSdAMdcc9aOEggRDrFLEw-maVNblFZBiLoXEOqGf-v4_n_qRBQ/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData as any).toString(),
        }
      );

      if (response) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10 animate-fadeIn w-full">
      {submitted ? (
        <p className="text-green-500 text-center text-lg font-medium">
          Thank you! Someone from our team will reach out to you in the next 24
          hours.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="entry.1604801949"
                value={formData['entry.1604801949']}
                onChange={handleChange}
                required
                className="mt-1 border block w-full border-gray-300 rounded-md shadow-sm p-2 pl-10"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="entry.1888786998"
                value={formData['entry.1888786998']}
                onChange={handleChange}
                required
                className="mt-1 border block w-full border-gray-300 rounded-md shadow-sm p-2 pl-10"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                name="entry.74727464"
                value={formData['entry.74727464']}
                onChange={handleChange}
                required
                className="mt-1 border block w-full border-gray-300 rounded-md shadow-sm p-2 pl-10"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="entry.1690397815"
                value={formData['entry.1690397815']}
                onChange={handleChange}
                required
                className="mt-1 block border w-full border-gray-300 rounded-md shadow-sm p-2 pl-10 h-40"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Help;
