'use client';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Children = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  delay?: number;
};

export default function MotionWrapper({
  children,
  delay,
}: Children): React.ReactElement {
  // 一意のキーを設定するためにラップした画面のパスを取得
  const pathName = usePathname();

  return (
    // アンマウント時の動きをつけるために必要な記述
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        initial={{ opacity: 0, y: 35 }} // 初期状態
        animate={{ opacity: 1, y: 0 }} // マウント時
        transition={{ delay: delay }}
        exit={{ opacity: 0 }} // アンマウント時
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
