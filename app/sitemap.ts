import { MetadataRoute } from 'next';
import { getBlogArticle, getCategory } from '@/libs/microcms';
import { pageLinks } from '@/data/links';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.SERVER_DOMAIN || '';

  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: baseURL,
      lastModified: new Date(),
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = pageLinks.map((page) => ({
    url: baseURL + page.href,
    lastModified: new Date(),
  }));

  const { categories } = await getCategory();

  const blogPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseURL}/blog/${category.id}`,
    lastModified: new Date(),
  }));

  const { blogs } = await getBlogArticle();

  const articlePages: MetadataRoute.Sitemap = blogs.contents.map((article) => ({
    url: `${baseURL}/article/${article.id}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt)
      : new Date(),
  }));

  return [...defaultPages, ...dynamicPages, ...blogPages, ...articlePages];
}
