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
      screens: {
        sm: {'max': '560px'},
        md: {'max': '768px'},
        tb: {'max': '960px'}
      },
      container: {
        center: true,
        padding: "1.25rem",
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
      backgroundImage: {
        'anker-icon': "url('/anker-icon.svg')",
      },
      backgroundSize: {
        13: "13px",
      },
      backgroundColor: {
        skyblue: "#0094FF",
      },
      colors: {
        skyblue: "#0094FF",
      }
    },
  },
  plugins: [],
};
export default config;
