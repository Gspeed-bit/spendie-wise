import Hero from "@/components/ui/shared/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Image src="/logo.png" width={60} height={50} alt="Logo" />
    </main>
  );
}
