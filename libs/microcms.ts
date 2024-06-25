import { MicroCMSQueries, createClient } from "microcms-js-sdk";
import { ProfileContents } from "@/types/cms/profile";
import { BlogArticles } from "@/types/cms/blog";
import { Category } from "@/types/cms/category";

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
    cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
    },
    endpoint: "profile",
  });

  return {
    props: result.contents,
  };
}

// 記事一覧の取得
export const getBlogArticle = async (param: string) => {
  const result = await microCMSClient.getList<BlogArticles>({
    customRequestInit: {
    cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
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
    cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
    },
    endpoint: "category",
    queries,
  });

  return {
    categories: result.contents,
  };
}
