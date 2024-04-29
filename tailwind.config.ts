import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", //selector
  theme: {
    extend: {
      colors: {
        dark: "#1E293B",
      },
    },
  },
  plugins: [],
} satisfies Config;
