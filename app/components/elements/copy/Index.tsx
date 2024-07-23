'use client';
import { useState } from 'react';

type CopyProps = {
  url: string;
  children: React.ReactNode;
};

const Copy = ({ url, children }: CopyProps): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const clickHandler = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒後にメッセージを消す
    } catch (error) {
      alert('失敗しました。');
    }
  };

  return (
    <>
      <button className="block" onClick={() => clickHandler()}>
        {children}
      </button>
      {copied && (
        <span className="absolute -top-6 -left-6 text-[10px] w-max">
          コピーしました！
        </span>
      )}
    </>
  );
};

export default Copy;
