type AccountLink = {
  icon: string;
  href: string;
};

/** 各種アカウントのリンク */
export const accountLinks: AccountLink[] = [
  {
    icon: 'X-icon',
    href: 'https://twitter.com/skt1910hg_r',
  },
  {
    icon: 'github-icon',
    href: 'https://github.com/sakatai11',
  },
  {
    icon: 'picture-icon',
    href: 'https://www.taichi-portfolio.com',
  },
];

/** 送信メール */
export const sendMessage = {
  form: 'さかのウェブサイト <support@saka-tai.com>',
  subject: 'お問い合わせを受け付けました',
  meSubject: 'お問い合わせがありました',
  error: 'お問い合わせに失敗しました',
  success: 'お問い合わせを受け付けました',
} as const;
