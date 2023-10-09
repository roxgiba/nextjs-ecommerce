import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0e3f6d",
          secondary: "#ef86a4",
          accent: "#27a8aa",
          neutral: "#2a2c3c",
          "base-100": "#3e3541",
          info: "#a5bff3",
          success: "#20b179",
          warning: "#f9d243",
          error: "#dc4838",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
