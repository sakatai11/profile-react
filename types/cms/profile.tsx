import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type ProfileContents = {
  id: string;
  name: string;
  url: string;
  my_info: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;