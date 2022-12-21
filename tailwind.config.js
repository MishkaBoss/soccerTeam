/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#f94c1d",
        bgColor: "#000300",
        navBg: "rgb(0 0 0 /60%)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}