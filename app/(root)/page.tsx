import Hero from "@/components/ui/shared/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-center md:max-w-screen flex-col">
      <div className="">
        <Hero />
        <Image
          className="-mt-20 rounded-xl"
          src="/image.png"
          width={900}
          height={50}
          alt="Logo"
        />
      </div>
    </main>
  );
}
