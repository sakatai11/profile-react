import { createClient } from "microcms-js-sdk";
import { ProfileContents } from "@/types/cms/profile";
import { BlogList } from "@/types/cms/blog";
import { Category } from "@/types/cms/category";
import { Article } from "@/types/cms/article";

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// microCMSClientの作成
export const microCMSClient = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || ""
});

// プロフィールの取得
export const getProfile = async () => {
  const result = await microCMSClient.getList<ProfileContents>({
    customRequestInit: {
      next: {
        revalidate: 600, // 600秒キャッシュを適用
      },
    },
    endpoint: "profile",
    queries: {
      fields: ['id', 'name', 'link_icon', 'my_info']
    }
  });

  return {
    props: result.contents,
  };
}

// 記事一覧の取得
export const getBlogArticle = async (param?: string, queries?: { limit?: number; offset?: number }) => {
  const result = await microCMSClient.getList<BlogList>({
    customRequestInit: {
      next: {
        revalidate: 600, // 600秒キャッシュを適用
      },
    },
    endpoint: "blog",
    queries: {
      limit: queries?.limit,
      offset: queries?.offset,
      fields: ['id', 'title', 'categories', 'url','content','eyecatch'],
      filters: param ? `categories[contains]${param}`: '',
      orders: "-publishedAt",
    }
  });

  return {
    blogs: result,
  };
}

// カテゴリIDの取得
export const getCategory = async (param?: string) => {
  const result = await microCMSClient.getList<Category>({
    customRequestInit: {
      next: {
        revalidate: 600, // 600秒キャッシュを適用
      },
    },
    endpoint: "category",
    queries: {
      fields: ['id', 'category'],
      filters: param ? `id[equals]${param}`: '',
    }
  });

  return {
    categories: result.contents,
    category: result.contents[0] //metaの取得
  };
}

// 特定の記事の取得
export const getBlogArticleDetail = async (contentId:string) => {
  const result = await microCMSClient.getListDetail<Article>({
    customRequestInit: {
        next: {
          revalidate: 600, // 600秒キャッシュを適用
        },
      },
      endpoint: "blog",
      contentId,
      queries: {
        fields: ['id', 'publishedAt', 'title', 'categories', 'content','eyecatch', 'toc_visible']
      }
    });

    return {
      article: result,
    };
}
