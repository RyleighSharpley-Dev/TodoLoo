// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // now font-sans = Montserrat
      },
      colors: {
        background: "#212121",
        foreground: "#ededed",
      },
    },
  },
  plugins: [],
};
