import facebookIcon from "@/public/facebook-icon.svg";
import XIcon from "@/public/X-icon.svg";
import lineIcon from "@/public/line-icon.svg";
import clipIcon from "@/public/clip-icon.svg";

type ShareLink = {
  alt: string;
  src: string;
  url?: string;
};

/** 各種アカウントのシェアリンク */
export const shareLinks: ShareLink[] = [
  {
    alt: "X-icon",
    src: XIcon,
    url: "https://twitter.com/share?url="
  },
  {
    alt: "facebook-icon",
    src: facebookIcon,
    url: "https://www.facebook.com/sharer/sharer.php?u="
  },
  {
    alt: "line-icon",
    src: lineIcon,
    url: "https://social-plugins.line.me/lineit/share?url="
  }
];

/** URLシェアリンク */
export const copyLink: ShareLink = {
  alt: "clip-icon",
  src: clipIcon
}