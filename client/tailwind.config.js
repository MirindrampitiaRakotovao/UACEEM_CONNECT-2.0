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
        sans: ['Poppins', 'sans-serif'],
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalSlideIn: {
          '0%': {
            opacity: '0',
            transform: 'translate(0, -1rem) scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, 0) scale(1)'
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('preline/plugin'),  // Ajoute ce plugin
  ],

  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'wave-left': 'waveLeft 2s ease-in-out infinite',
        'wave-right': 'waveRight 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-delay': 'fadeIn 0.5s ease-out 0.3s forwards',
      },
      keyframes: {
        waveLeft: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-20deg)' }
        },
        waveRight: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
};
