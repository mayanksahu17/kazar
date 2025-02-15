import React from 'react';
import './Testimonials.css';  // Make sure to import your CSS file

const Testimonials = () => {
  return (
    <>
      <section
        className="bg-white py-16"
        style={{ fontFamily: 'Calibri, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Layout for All Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aadvik */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Aadvik</h3>
              <p className="text-black font-semibold">Student to Full-time</p>
              <p className="text-gray-700 mb-4">
                Aadvik received offer letter from FAANG and ready for next round
                at Spotify
              </p>
              <img
                src="Testimonial6.jpeg"
                alt="Sunny Testimonial"
                className="shadow-lg rounded-lg w-2/3 mx-auto"
              />
            </div>

            {/* Yash */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Yash</h3>
              <p className="text-black font-semibold">Interview with Netflix</p>
              <p className="text-gray-700 mb-4">
                Yash received Interview from Netflix for Data Analyst
              </p>
              <img
                src="Testimonial15.jpeg"
                alt="Surabhi Testimonial"
                className="shadow-lg rounded-lg w-full h-auto mb-10"
                style={{ maxWidth: '100%', maxHeight: '1000px' }}
              />
              {/* Pratik */}
              <div className="text-center">
                <h3 className="text-green-600 font-bold text-lg">Atharva</h3>
                <p className="text-black font-semibold">
                  Interview with First Help Financial
                </p>
                <p className="text-gray-700 mb-4">
                  Atharva received Interview from First Help Financial
                </p>
                <img
                  src="Testimonial16.jpeg"
                  alt="Pratik Testimonial"
                  className="shadow-lg rounded-lg w-full"
                />
              </div>
            </div>

            {/* Ashutosh */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Nihar</h3>
              <p className="text-black font-semibold">
                Received interview from Netflix
              </p>
              <p className="text-gray-700 mb-4">
                Nihar received interview call from Netflix
              </p>
              <img
                src="Testimonial18.jpeg"
                alt="Anjali Testimonial"
                className="shadow-lg rounded-lg w-full mb-10"
              />
              <div className="text-center">
                <h3 className="text-green-600 font-bold text-lg">Anshul</h3>
                <p className="text-black font-semibold">
                  Received referral at Microsoft and Amazon
                </p>
                <p className="text-gray-700 mb-4">
                  Anshul received multiple referrals from Tech companies
                </p>
                <img
                  src="Testimonial17.jpeg"
                  alt="Anshul Testimonial"
                  className="shadow-lg rounded-lg w-full mb-1"
                />
                <img
                  src="Testimonial13.png"
                  alt="Anshul Testimonial"
                  className="shadow-lg rounded-lg w-full mb-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-white py-16"
        style={{ fontFamily: 'Calibri, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Layout for All Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Clint */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Clint</h3>
              <p className="text-black font-semibold">
                Received call in Free Trial
              </p>
              <p className="text-gray-700 mb-4">
                Clint received the call very next day after joining free trial.
              </p>
              <img
                src="Testimonial5.jpeg"
                alt="Sunny Testimonial"
                className="shadow-lg rounded-lg w-2/3 mx-auto"
              />
            </div>

            {/* Riya */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Riya</h3>
              <p className="text-black font-semibold">Interview with G2I</p>
              <p className="text-gray-700 mb-4">
                Riya received final interview
              </p>
              <img
                src="Testimonial10.png"
                alt="Surabhi Testimonial"
                className="shadow-lg rounded-lg w-full h-auto mb-10"
                style={{ maxWidth: '100%', maxHeight: '1000px' }}
              />
              {/* Banu */}
              <div className="text-center">
                <h3 className="text-green-600 font-bold text-lg">Banu</h3>
                <p className="text-black font-semibold">
                  Reached to Hiring Managers via cold emails
                </p>
                <p className="text-gray-700 mb-4">Cold emails</p>
                <img
                  src="Testimonial11.png"
                  alt="Pratik Testimonial"
                  className="shadow-lg rounded-lg w-full"
                />
              </div>
            </div>

            {/* Ashutosh */}
            <div className="text-center">
              <h3 className="text-green-600 font-bold text-lg">Ashutosh</h3>
              <p className="text-black font-semibold">
                Received interview from Franklin Covey
              </p>
              <p className="text-gray-700 mb-4">
                Ashustosh received interview call from Franklin Covey
              </p>
              <img
                src="Testimonial12.png"
                alt="Anjali Testimonial"
                className="shadow-lg rounded-lg w-full mb-10"
              />
              <div className="text-center">
                <h3 className="text-green-600 font-bold text-lg">Deepshi</h3>
                <p className="text-black font-semibold">
                  Deepshi received two offers
                </p>
                <p className="text-gray-700 mb-4">
                  Deepshi received offers from Workday and Ramp
                </p>
                <img
                  src="Testimonial19.jpeg"
                  alt="Anshul Testimonial"
                  className="shadow-lg rounded-lg w-2/3 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Testimonials;
