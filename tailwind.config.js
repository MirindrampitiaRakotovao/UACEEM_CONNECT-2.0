/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    //'./public/index.html',
    'node_modules/preline/dist/*.js',
  ],
  plugins: [
    // require('@tailwindcss/forms'),
      require('preline/plugin'),
  ],
  darkMode: 'class', // Tu peux changer 'class' en 'media' si tu préfères
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
}
