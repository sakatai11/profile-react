import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";
import { Category } from "./category";

export type BlogList = {
  id: string;
  title: string;
  categories: Category[];
  url: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;