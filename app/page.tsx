import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/logo.png" width={100} height={50} alt="Logo" />
      
    </main>
  );
}
