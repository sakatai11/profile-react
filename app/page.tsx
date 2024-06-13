import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image 
        src="/illustration.png"
        height={320}
        width={320}
        alt=""
      />
      <h1 className="font-spartan text-5xl tracking-widest font-semibold">saka&apos;s portfolio site</h1>
    </div>
  );
}
