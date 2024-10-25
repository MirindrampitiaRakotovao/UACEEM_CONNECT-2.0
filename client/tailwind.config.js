/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "node_modules/preline/dist/*.js",  // Ajoute cette ligne
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6b7280', // Couleur de fond clair
          DEFAULT: '#4b5563', // Couleur de fond par défaut
          dark: '#1f2937', // Couleur de fond sombre
        },
        secondary: {
          light: '#3b82f6', // Bleu clair
          DEFAULT: '#2563eb', // Bleu par défaut
          dark: '#1d4ed8', // Bleu sombre
        },
        // Vous pouvez ajouter d'autres couleurs ici
      },
      spacing: {
        // Ajoutez des espacements personnalisés ici
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        // Ajoutez des polices personnalisées ici
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),  // Ajoute ce plugin
  ],
};
