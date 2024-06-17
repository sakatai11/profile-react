import { createClient } from "microcms-js-sdk";
import type { ProfileContents } from "@/types/cms/profile";

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
  const result = await microCMSClient.getList<ProfileContents>({ endpoint: "profile"});
  return {
    props: {
      contents: result.contents,
    }
  };
} 
