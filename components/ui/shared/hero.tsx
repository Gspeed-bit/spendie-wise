const Hero = () => {
  return (
    <section className="bg-grey-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-bluey-400 via-primary-500 to-primary-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Welcome to Spend Wise - Your Trusted Guide to Financial Wellness.
          </h1>
          <span className="sm:block p-semibold-20 md:h3-bold text-primary-500">
            Save Smarter, and Live Better.
          </span>

          <p className="mx-auto mt-4 max-w-xl p-medium-12 md:p-medium-18">
            Let's Navigate Your Financial Journey Together!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-primary-300 bg-primary-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-primary-300 px-12 py-3 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
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
