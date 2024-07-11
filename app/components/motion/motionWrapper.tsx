"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


type Children = {
  children: React.ReactNode
}

export default function MotionWrapper({children}:Children):JSX.Element {
  // 一意のキーを設定するためにラップした画面のパスを取得
  const pathName = usePathname()
  // console.log('anme');

  return (
    // アンマウント時の動きをつけるために必要な記述
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        initial={{ opacity: 0 }} //初期状態
        animate={{ opacity: 1 }} // マウント時
        exit={{ opacity: 0 }} // アンマウント時
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}