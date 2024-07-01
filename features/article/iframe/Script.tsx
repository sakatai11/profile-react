'use client';
import { useEffect } from 'react';

const Script = () => {
  useEffect(()=>{
    // scriptを読み込み
    const script = document.createElement('script');
    script.src = "//cdn.iframe.ly/embed.js";
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
     }
  }, [])

  return null;
}

export default Script;
