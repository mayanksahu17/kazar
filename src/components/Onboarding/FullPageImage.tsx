const BannerWithText = () => {
  return (
    <div className="relative w-full h-auto mt-4">
      <img
        src="Onboardingbanner.jpg" // Replace with your actual image path
        alt="Background Image"
        className="object-cover w-full h-auto"
        style={{
          minHeight: '300px',
        }}
      />
      <style jsx>{`
        @media (max-width: 640px) {
          img {
            filter: blur(4px); /* Adjust the blur intensity */
          }
        }

        @media (min-width: 641px) {
          img {
            filter: none;
          }
        }
      `}</style>
      <div className="absolute inset-0 top-4 flex flex-col items-center text-center text-black px-2 mt-5 sm:mt-16">
        <h2 className="text-lg sm:text-lg font-bold mb-1">
          We've helped 600+ fellows of all sorts of backgrounds land great jobs
        </h2>
        <div className="flex justify-center space-x-1 sm:space-x-2 mb-2">
          <div className="bg-white p-1 rounded-md shadow-md text-xs sm:text-sm">
            <p className="font-bold">$83,307</p>
            <p>avg junior base salary</p>
          </div>
          <div className="bg-white p-1 rounded-md shadow-md text-xs sm:text-sm">
            <p className="font-bold">$134,973</p>
            <p>avg mid-level base salary</p>
          </div>
          <div className="bg-white p-1 rounded-md shadow-md text-xs sm:text-sm">
            <p className="font-bold">$199,896</p>
            <p>avg senior base salary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWithText;
