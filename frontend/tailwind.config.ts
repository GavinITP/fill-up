import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        'lightblue-200': '#81D4FA',
        'lightblue-500': '#03A9F4',
        'lightblue-700': '#0288D1',
        'lightblue-900': '#01579B',
        'lightgreen-200': '#C5E1A5',
        'lightgreen-500': '#8BC34A',
        'lightgreen-900': '#33691E',
        'newred-200': '#EF9A9A',
        'newred-500': '#F44336',
        'newred-900': '#B71C1C',
        'newyellow-800': '#F9A825',
        'newgray-200': '#EEEEEE',
        'newgray-400': '#BDBDBD'
      }
    },
  },
  plugins: [],
};

export default config;
