/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      boxShadow: {
        normal: "0 0px 10px rgba(0, 0, 0, 0.15)",
        insetview: "inset 0 5px 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
