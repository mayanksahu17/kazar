import React from "react";
import Image from "next/image";
import Link from "next/link";

const companies = [
  { name: "Blackrock", src: "blackrock.svg", height: 16 },
  { name: "Google", src: "google.png", height: 12 },
  { name: "Tinder", src: "Tinder.png", height: 20 },
  { name: "Amazon", src: "Amazon.png", height: 20 },
  { name: "JP Morgan & Chase", src: "JPMorgan.png", height: 24 },
  { name: "ServiceNow", src: "servicenow.svg", height: 16 },
  { name: "DE Shaw & Co", src: "DEShaw.svg", height: 12 },
  { name: "Coca Cola", src: "cocacola.svg", height: 20 },
  { name: "Nvidia", src: "Nvidia.png", height: 16 },
  { name: "Societe Generale", src: "SocieteGenerale.png", height: 24 },
  { name: "Airbnb", src: "airbnb.png", height: 16 },
  { name: "EY", src: "EY.svg", height: 16 },
  { name: "Apex Analytix", src: "apexanalytix.svg", height: 16 },
  { name: "Pinterest", src: "Pinterest.svg", height: 24 },
  { name: "Salesforce", src: "salesforce.png", height: 16 },
  { name: "Microsoft", src: "microsoft.png", height: 12 },
  { name: "Wex", src: "wex.svg", height: 10 },
  { name: "Twitch", src: "twitch.png", height: 10 },
  { name: "Uber", src: "uber.png", height: 16 },
  { name: "DoorDash", src: "doordash.svg", height: 16 },
  { name: "FIS", src: "FIS.png", height: 16 },
  { name: "Walmart", src: "Walmart.png", height: 20 },
  { name: "S&P Global", src: "spglobal.svg", height: 8 },
  { name: "Clear Street", src: "clear_street.svg", height: 14 },
];

const WorksFor: React.FC = () => {
  return (
    <section className="bg-transparent py-8 mb-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          We Proudly Say, Our Clients Now Work At
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          We stand by our commitments and ensure that our actions align with our promises.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center transition-transform hover:scale-105"
            >
              <div className="relative w-full h-16 flex items-center justify-center">
                <Image
                  src={`/${company.src}`}
                  alt={company.name}
                  width={100}
                  height={company.height * 4}
                  className="h-auto w-auto max-h-full max-w-[80%] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-gray-600 text-lg">
          We've worked with several thousand fellows and counting.{' '}
          <Link href="/wall" className="text-blue-600 hover:underline font-medium">
            Read their stories here
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default WorksFor;

