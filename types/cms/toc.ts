import { MicroCMSDate } from "microcms-js-sdk";

export type TocProps = {
  id: string;
  name: string;
  text: string;
} & MicroCMSDate;