import React, { SVGProps } from 'react';


const Investor = () => {
  return (
    <>
<section className="bg-white py-8 mb-32 mt-24">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-5xl font-bold mb-4 style={{ fontFamily: 'Calibri' }}">
      <span className="text-black">Have more questions?</span>{' '}
      <span className="text-gray-400">Let's chat!</span>
    </h2>

    <p className="mb-6 text-gray-700 style={{ fontFamily: 'Calibri' }}">
      We understand that you might have questions specific to your situation. <br />
      Schedule a call with our founder – we're here to help you succeed!
    </p>

    <div className="flex justify-center space-x-6 mb-6">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V6c0-1.104-.896-2-2-2zM5 20V9h14v11H5z"/>
        </svg>
        <span className="ml-2 text-gray-700">Flexible scheduling</span>
      </div>
      <div className="flex items-center">
      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.487 17.14l-4.722-2.13a1.002 1.002 0 0 0-1.15.228l-2.252 2.252c-2.926-1.548-5.279-3.901-6.827-6.827l2.252-2.252a1.002 1.002 0 0 0 .228-1.15L6.86 3.513A1.005 1.005 0 0 0 5.99 3H3c-.552 0-1 .448-1 1C2 14.493 9.507 22 20 22c.552 0 1-.448 1-1v-2.99a1.005 1.005 0 0 0-.513-.87z"/>
      </svg>

        <span className="ml-2 text-gray-700">One-on-one call</span>
      </div>
      <div className="flex items-center">
      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 14V4h16v10H5.17L4 15.17V14z"/>
      </svg>

        <span className="ml-2 text-gray-700">Personalized advice</span>
      </div>
    </div>

    <a
      href="https://apply.neetocal.com/meeting-with-nikhil-jain"
      target="_blank"
      className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg font-bold text-white bg-green-600 border-2 border-green-600 rounded-xl hover:bg-green-700 transition-all"
    >
      Talk to Founder <span className="animate-bounce ml-2">👋</span>
    </a>
    <p className="mt-2 text-gray-600">Book your call now!</p>
  </div>
</section>



      <section className="py-16 bg-[#faf8f2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            {/* Content in row one */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              {' '}
              {/* Added margin-bottom for spacing */}
              <h2
                className="text-5xl font-bold mb-5 text-gray-800"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Many kickass investors believe in our mission.
              </h2>
              <p
                className="text-center md:text-left mb-3 text-gray-500 text-xl"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                All of them are top of their game in Careers and Immigration.
                Here are a couple of them.
              </p>
            </div>
            {/* Images and text in row two */}
            <div className="md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <img
                  alt="Investor 1"
                  src="/Mudambi.jpeg"
                  className="w-64 h-64 md:w-64 md:h-64 rounded-full inline-block transition-transform duration-300 ease-in-out transform hover:scale-110"
                  style={{
                    border: '3px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold mt-4">
                  Prachi Jain | Tech Lead  Persistent System
                </h3>
                <div className="flex justify-center space-x-2 mt-2">
                  <a
                    className="text-gray-400 hover:text-gray-500"
                    target="_blank"
                    href="https://www.linkedin.com/in/prachij19/"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                  {/* <a className="text-gray-400 hover:text-gray-500" href="#">
<InstagramIcon className="h-6 w-6" />
</a> */}
                </div>
              </div>

              <div className="text-center">
                <img
                  alt="Investor 2"
                  src="/Tithy.jpeg"
                  className="w-64 h-64 md:w-64 md:h-64 rounded-full inline-block transition-transform duration-300 ease-in-out transform hover:scale-110"
                  style={{
                    border: '3px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold mt-4">
                  Tithy Sahu | Software Engineer Google
                </h3>
                <div className="flex justify-center space-x-2 mt-2">
                  <a
                    className="text-gray-400 hover:text-gray-500"
                    target="_blank"
                    href="https://www.linkedin.com/in/tithys30/"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                  {/* <a className="text-gray-400 hover:text-gray-500" target="_blank" href="https://www.linkedin.com/in/rrishijain/">
<InstagramIcon className="h-6 w-6" />
</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Investor;

function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
