import Image from 'next/image';
import illustration from '/public/illustration.webp';

const TopImg = () => {
  return (
    <>
      <div className="flex w-full grow flex-col items-center justify-end">
        <Image
          src={illustration}
          height={248}
          width={248}
          alt="イラスト"
          className="mb-6 md:size-44"
          priority={true}
          sizes="100vw"
        />
      </div>
    </>
  );
};

export default TopImg;
