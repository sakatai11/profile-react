import Link from "next/link";

type LinkButtonProps = {
  text:string;
};

const LinkButton = ({text}:LinkButtonProps): JSX.Element => {

  return (
    <div className="py-14 w-[320px] md:w-full text-center m-auto">
      <Link href="/blog" className="p-3 block text-center bg-skyblue text-white rounded-lg duration-500 opacity-100 hover:opacity-70 hover:duration-500">{text}</Link>
    </div>
  );
}

export default LinkButton;