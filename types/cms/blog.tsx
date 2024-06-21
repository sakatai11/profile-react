import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type BlogArticles = {
  id: string;
  title: string;
  url: string;
  category: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;