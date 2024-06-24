import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";
import { Article, Category } from "./category";

export type BlogArticles = {
  id: string;
  title: string;
  categories: Category[];
  url: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;