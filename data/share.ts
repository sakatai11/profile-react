import facebookIcon from "@/public/facebook-icon.svg";
import XIcon from "@/public/X-icon.svg";
import lineIcon from "@/public/line-icon.svg";
import clipIcon from "@/public/clip-icon.svg";

type ShareLink = {
  alt: string;
  src: string;
};

/** 各種アカウントのシェアリンク */
export const shareLinks: ShareLink[] = [
  {
    alt: "X-icon",
    src: XIcon
  },
  {
    alt: "facebook-icon",
    src: facebookIcon
    
  },
  {
    alt: "line-icon",
    src: lineIcon
  }
];

/** URLシェアリンク */
export const copyLink: ShareLink = {
  alt: "clip-icon",
  src: clipIcon
}