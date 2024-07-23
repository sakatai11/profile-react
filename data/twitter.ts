type TwitterOpenGraph = {
  card: string;
  site: string;
};

// top,profile,blog対応
export const commonTwitterOpenGraph: TwitterOpenGraph = {
  card: 'summary', // Twitterカードの種類を指定
  site: '@skt1910hg_r', // Twitterハンドル
};
