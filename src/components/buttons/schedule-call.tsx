import Link from 'next/link';

//test comment to add to github (Remove later)
const ScheduleCallButton = () => {
  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <Link href="https://apply.neetocal.com/meeting-with-nikhil-jain">
        <button className="relative flex items-center justify-center gap-2 px-4 py-1.5 text-sm md:text-base font-medium text-primary-foreground bg-white rounded-full hover:bg-gray-100 transition-all shadow-md border border-gray-300 w-full md:w-auto">
          <span className="rounded-full bg-white p-1.5">
            <img
              src="Ashwin_jain.png"
              alt="Custom Image"
              className="h-5 w-5 rounded-full"
              loading="lazy"
            />
          </span>
          <span>Schedule a Call</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:ml-1 h-4 w-4 text-gray-400"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-2 h-4 w-4 text-gray-400"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 mt-1 -mr-1 h-3 w-3 bg-green-500 rounded-full"></span>
        </button>
      </Link>
    </div>
  );
};

export default ScheduleCallButton;
