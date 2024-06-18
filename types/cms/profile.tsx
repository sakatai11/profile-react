import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type ProfileContents = {
  id: string;
  name: string;
  url: string;
  text: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;