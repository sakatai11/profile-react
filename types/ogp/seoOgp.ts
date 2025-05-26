export type Images = {
  width: string;
  height: string;
  url: string;
};

export type OpenGraph = {
  url: string;
  siteName?: string;
  images?: Images[];
  locale?: string;
  type?: string;
};

export type SiteConfig = {
  defaultTitle: string;
  defaultDescription: string;
  titleTemplate: string;
  defaultOpenGraph: OpenGraph;
};

export type OgpResult = {
  title: string;
  image: string;
  domain: string;
  url: string;
};