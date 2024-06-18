import Image from "next/image";
import Link from "next/link";
import { pageLinks } from "@/data/links";
import illustration from "/public/illustration.png";

const Main:React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full flex flex-col items-center justify-end grow-1.3">
        <Image 
          src={illustration}
          height={248}
          width={248}
          alt="イラスト"
          className="mb-6"
        />
        <h1 className="font-spartan text-5xl tracking-widest font-semibold">saka&apos;s portfolio site</h1>
      </div>
      <div className="flex items-center justify-center gap-16 grow">
        {
          pageLinks.map(({ name, href }) => (
            <Link href={href} key={name} className="hover-img relative after:content-[''] after:w-6/12 after:h-0.5 after:bg-[#0094FF] after:block after:m-auto inline-block font-spartan text-2xl tracking-wider leading-relaxed">{name}</Link>
          ))
        }
      </div>
        
    </div>
  );
}

export default Main;
