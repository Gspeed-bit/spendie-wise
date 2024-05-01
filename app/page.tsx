import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/image copy.png" width={100} height={50} alt="Logo" />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
        molestias! Nobis nemo aliquid necessitatibus ad doloribus eligendi et
        itaque quos neque nesciunt est asperiores, vitae libero distinctio.
        Ratione, natus vel!
      </p>
    </main>
  );
}
