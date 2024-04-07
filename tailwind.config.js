/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    // base: false,
    // prefix: 'twe-'
  }
}

