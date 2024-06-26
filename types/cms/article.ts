import { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

export type Article = {
	id: string;
  publishedAt: string;
	title: string;
	content: string;
	eyecatch?: MicroCMSImage;
	toc_visible: boolean;
} & MicroCMSDate;