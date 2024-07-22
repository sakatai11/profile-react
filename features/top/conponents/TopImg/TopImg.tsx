import Image from "next/image";
import illustration from "/public/illustration.webp";

const TopImg = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-end grow">
        <Image 
          src={illustration}
          height={248}
          width={248}
          alt="イラスト"
          className="mb-6 md:h-44 md:w-44"
          priority
        />
      </div>
    </>
  );
}

export default TopImg;
