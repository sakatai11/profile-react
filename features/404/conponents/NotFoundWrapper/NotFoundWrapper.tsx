import Link from "next/link";

const NotFoundWrapper = () => {
  return (
      <div className="absolute inset-y-2/4 flex flex-col justify-center items-center w-full">
        <h1 className="font-spartan text-5xl tracking-widest font-semibold">404 Not Found</h1>
        <p className="mt-5">お探しのページが見つかりませんでした。</p>
        <div className="mt-10 max-w-[180px] w-full">
          <Link href="/" className="p-3 block text-center bg-skyblue text-white rounded-lg duration-500 opacity-100 hover:opacity-70 hover:duration-500">トップに戻る</Link>
        </div>
    </div>
  )
}

export default NotFoundWrapper;