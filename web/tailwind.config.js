/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        principal: "#222831",
        modal: "rgba(0, 0, 0, 0.5)",
      },
      gridTemplateColumns: {
        "report-teacher": "repeat(5, minmax(80px, 1fr))",
      },
      height: {
        "fill-available": "-webkit-fill-available",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
