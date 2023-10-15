/**
 * 中性色板 
 * https://ant.design/docs/spec/colors-cn#%E4%B8%AD%E6%80%A7%E8%89%B2%E6%9D%BF
 */
const neutralColor = {
  "gray-1": "#ffffff",
  "gray-2": "#fafafa",
  "gray-3": "#f5f5f5",
  "gray-4": "#f0f0f0",
  "gray-5": "#d9d9d9",
  "gray-6": "#bfbfbf",
  "gray-7": "#8c8c8c",
  "gray-8": "#595959",
  "gray-9": "#434343",
  "gray-10": "#262626",
  "gray-11": "#1f1f1f",
  "gray-12": "#141414",
  "gray-13": "#000000",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: neutralColor,
      borderColor: neutralColor,
    },
  },
  plugins: [],
};
