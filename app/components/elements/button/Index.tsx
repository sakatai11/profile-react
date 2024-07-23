import Link from 'next/link';

type LinkButtonProps = {
  text: string;
};

const LinkButton = ({ text }: LinkButtonProps): JSX.Element => {
  return (
    <div className="m-auto w-[320px] py-14 text-center md:w-full">
      <Link
        href="/blog"
        className="block rounded-lg bg-skyblue p-3 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
      >
        {text}
      </Link>
    </div>
  );
};

export default LinkButton;
