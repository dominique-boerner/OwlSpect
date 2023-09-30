/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#ffffff",
        dark: "#1E1E1E",
        success: "#009065",
        danger: "#F44336",
        warning: "#FFC107",
      },
      fontFamily: {
        happyMonkey: ["Happy Monkey"],
      },
    },
  },
  variants: {
    extend: {},
  },
};
