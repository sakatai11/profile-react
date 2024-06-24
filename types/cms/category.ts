import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

// Category型の定義
export type Category = {
	id: string;
	category: string;
}& MicroCMSDate

export type Article = {
	id: string;
	title: string;
	content: string;
	eyecatch?: MicroCMSImage;
  // categoriesフィールドの追加
	categories: Category[];
} & MicroCMSDate;