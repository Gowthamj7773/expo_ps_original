/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#7D53F6',
        primaryLight: 'rgba(125, 83, 246,0.75)',
        secondary: '#ECE8FE',
        secondaryDark: '#ddd7fc',
        background: '#f6f5fc',
      },
    },
  },
  plugins: [],
};