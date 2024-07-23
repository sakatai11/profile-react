import { MicroCMSDate } from 'microcms-js-sdk';

type linkIcon = {
  url: string;
  height: number;
  width: number;
};

export type ProfileContents = {
  id: string;
  name: string;
  link_icon: linkIcon[];
  my_info: string;
} & MicroCMSDate;
