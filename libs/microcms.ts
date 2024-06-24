import { MicroCMSQueries, createClient } from "microcms-js-sdk";

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

