import { MicroCMSDate } from 'microcms-js-sdk';

// Category型の定義
export type Category = {
  id: string;
  publishedAt?: string;
  category: string;
} & MicroCMSDate;
