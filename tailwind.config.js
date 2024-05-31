/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins-Regular", "sans-serif"],
      },
      colors: {
        "primary-color": "#20DD20",
        "line-color": "#D3D7DC",
        "warning-color": "#FFDD02",
        "error-color": "#FF4332",
        "disabled-color": "#A4AFBD",
        "profile-icon-color": "#F7F7F7",
        "logout-color": "#FF3232",
        "addition-acion-color": "#4F46E5",
      },
      height: {
        "custom-height": "calc(100vh - 64px )",
      },
    },
  },
  plugins: [],
};
