import Link from "next/link";

const InternalWrapper = () => {
  return (
      <div className="absolute inset-y-2/4 flex flex-col justify-center items-center w-full">
        <h1 className="font-spartan text-5xl tracking-widest font-semibold">500 Internal Server Error</h1>
        <p className="mt-5">現在サーバーに問題が発生しています。しばらくしてから再度お試しください。</p>
        <div className="mt-10 max-w-[180px] w-full">
          <Link href="/" className="p-3 block text-center bg-skyblue text-white rounded-lg duration-500 opacity-100 hover:opacity-70 hover:duration-500">トップに戻る</Link>
        </div>
    </div>
  )
}

export default InternalWrapper;