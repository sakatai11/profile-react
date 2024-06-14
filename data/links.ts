type PageLink = {
  name: string;
  href: string;
};

/** Topのリンク */
export const topLink: PageLink[] = [
  {
    name: "top",
    href: "/"
  }
];

/** 各ページへのリンク */
export const pageLinks: PageLink[] = [
  {
    name: "profile",
    href: "/profile"
  },
  {
    name: "blog",
    href: "/blog"
  }
];

