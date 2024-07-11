"use client";
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

type Children = {
  children: React.ReactNode
}

export default function Template({children}:Children):JSX.Element {
  // 一意のキーを設定するためにラップした画面のパスを取得
  const pathName = usePathname()
  // console.log('anme');

  return (
    // アンマウント時の動きをつけるために必要な記述
    <AnimatePresence>
      <motion.main
        key={pathName}
        initial={{ opacity: 0 }} //　初期状態
        animate={{ opacity: 1 }} // マウント時
        // exit={{ opacity: 0 }} // アンマウント時
        className={pathName === '/' ? 'h-svh' : 'pt-[6.45rem] calc-min-100' }
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
