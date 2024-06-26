import { MicroCMSQueries, createClient } from "microcms-js-sdk";
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
export const getProfile = async (queries?: MicroCMSQueries) => {
  const result = await microCMSClient.getList<ProfileContents>({
    customRequestInit: {
      next: {
        revalidate: 0, // 0秒キャッシュを適用
      },
    },
    endpoint: "profile",
    queries,
  });

  return {
    props: result.contents,
  };
}

// 記事一覧の取得
export const getBlogArticle = async (param?: string) => {
  const result = await microCMSClient.getList<BlogList>({
    customRequestInit: {
      next: {
        revalidate: 0, // 0秒キャッシュを適用
      },
    },
    endpoint: "blog",
    queries: {
      filters: param ? `categories[contains]${param}`: '',
    }
  });

  return {
    blogs: result.contents,
  };
}

// カテゴリIDの取得
export const getCategory = async (queries?: MicroCMSQueries) => {
  const result = await microCMSClient.getList<Category>({
    customRequestInit: {
      next: {
        revalidate: 0, // 0秒キャッシュを適用
      },
    },
    endpoint: "category",
    queries,
  });

  return {
    categories: result.contents,
  };
}

// 特定の記事の取得
export const getBlogArticleDetail = async (contentId:string, queries?: MicroCMSQueries) => {
  const result = await microCMSClient.getListDetail<Article>({
    customRequestInit: {
        next: {
          revalidate: 0, // 0秒キャッシュを適用
        },
      },
      endpoint: "blog",
      contentId,
      queries,
    });

    return {
      article: result,
    };
}
