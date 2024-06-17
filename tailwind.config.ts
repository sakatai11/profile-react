import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //カスタム値
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
      translate: {
        "-translate-y-full": "-100%",
      },
      fontFamily: {
        'spartan': ['Spartan', 'sans-serif'],
        'noto-sans-jp': ['Noto Sans JP', 'sans-serif']
      },
      flexGrow: {
        1.3: "1.3",
      },
    },
  },
  plugins: [],
};
export default config;
