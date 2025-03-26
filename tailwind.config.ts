/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '100% 50%' },
          '50%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
};