import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className=" bg-primary-100 bg-cover bg-fixed w-full bg-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-60 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src="/spendImage.jpg"
            width={1000}
            height={100}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl space-y-6 text-center ">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Speed Wise
            </h1>
            <p className="mt-4 leading-relaxed text-grey-500">
              Your Trusted Guide to Financial Wellness.
            </p>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
