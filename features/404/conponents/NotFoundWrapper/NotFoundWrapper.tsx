import Link from 'next/link';

const NotFoundWrapper = () => {
  return (
    <div className="mt-44 md:mt-36">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="font-spartan text-5xl font-bold tracking-widest md:text-3xl">
          404 Not Found
        </h1>
        <p className="mt-5">お探しのページが見つかりませんでした。</p>
        <div className="mt-10 w-full max-w-[180px]">
          <Link
            href="/"
            className="block rounded-lg bg-skyblue p-3 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundWrapper;
