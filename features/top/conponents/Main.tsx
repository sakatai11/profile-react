import Image from "next/image";
import Link from "next/link";
import { pageLinks } from "@/data/links";

const Main:React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image 
        src="/illustration.png"
        height={320}
        width={320}
        alt="illustration"
      />
      <h1 className="font-spartan text-5xl tracking-widest font-semibold">saka&apos;s portfolio site</h1>
      <div className="mt-24">
        {
          pageLinks.map(({ name, href }) => (
            <Link href={href} key={name}>{name}</Link>
          ))
        }
      </div>
    </div>
  );
}

export default Main;
