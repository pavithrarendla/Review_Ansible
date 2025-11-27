import React from "react";
import InfoSection from "./InfoSection";

const Home = () => {
  return (
    <>
    <section>
      {/* Hero Section */}
      <div className="relative py-12 bg-[#DBE4C9] overflow-hidden sm:py-16 lg:py-20">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
              {/* Left Content */}
              <div className="max-w-lg mx-auto text-center lg:max-w-none lg:mx-0 lg:order-2 lg:text-left">
                <p className="text-base font-medium text-gray-600">
                  Book your favorite events anytime 🎟
                </p>
                <h1 className="mt-5 text-3xl font-bold text-gray-900 lg:mt-8 sm:text-4xl xl:text-5xl xl:leading-tight">
                  Online Ticket Booking made simple & fast 
                </h1>

                <div className="mt-10 lg:mt-14">
                  <p className="text-base font-bold text-gray-900">
                    Get started with hassle-free bookings today!
                  </p>

                  <form action="#" className="mt-4 lg:mt-5">
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email to get updates"
                        className="block w-full px-4 py-3 text-base font-normal leading-7 text-gray-900 placeholder-gray-500 bg-white border border-white rounded-md focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="inline-flex w-full lg:w-auto items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600 focus:ring-offset-[#FFE942]"
                      >
                        Start Booking Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative lg:order-1">
                <div className="absolute -inset-24">
                  <img
                    className="w-full h-full"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/3/text-pattern.png"
                    alt="pattern"
                  />
                </div>

                <div className="relative">
                  <img
                    className="w-full max-w-xs mx-auto xl:max-w-sm"
                    
                    src="/vecteezy_cinema-movie-ticket-on-transparent-background_16770557.png"
                    alt="tickets"
                  />
                </div>
              </div>
            </div>
                    </div>
                    </div>
      </div>
    </section>
    <InfoSection />
    </>
  );
};

export default Home;
