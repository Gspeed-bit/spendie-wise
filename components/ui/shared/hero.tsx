"use client";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

const Hero = () => {
  const { user, isSignedIn } = useUser();
  return (
    <section className="">
      <div className="mx-auto max-w-screen px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="bg-gradient-to-r from-bluey-400 via-primary-500 to-primary-600 bg-clip-text h3-bold font-extrabold text-transparent sm:text-5xl ">
            Welcome to Spend Wise - Your Trusted Guide to Financial Wellness.
          </h1>
          <p className="sm:block p-semibold-20 md:h3-bold bg-gradient-to-r from-bluey-400  via-primary-500 to-primary-600 bg-clip-text font-extrabold text-transparent ">
            Save Smarter, and Live Better.
          </p>

          <p className="mx-auto mt-4 max-w-xl p-medium-12 text-primary md:p-medium-18">
            Let's Navigate Your Financial Journey Together!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isSignedIn ? (
              <span className=" h5-bold bg-gradient-to-r from-bluey-400  via-primary-500 to-primary-600 bg-clip-text font-extrabold text-transparent">{`Welcome ${user.fullName}`}</span>
            ) : (
              <a
                className="block w-full rounded border border-primary-300 bg-primary-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary-500   focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/sign-in"
              >
                Get Started
              </a>
            )}

            <a
              className="block w-full rounded border border-primary-300 px-12 py-3 text-sm font-medium text-primary hover:bg-primary-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/dashboard"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
