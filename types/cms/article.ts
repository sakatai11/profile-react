import { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';
import { Category } from './category';

export type Article = {
  id: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  categories: Category[];
  content: string;
  eyecatch?: MicroCMSImage;
  toc_visible: boolean;
} & MicroCMSDate;
