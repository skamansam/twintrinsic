
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [ 'bg-danger', 'bg-warning', 'bg-info', 'bg-success', 'bg-failure' ],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      'element': colors.stone,
      'light': colors.stone[300],
      'dark': colors.stone[800],
      'danger': colors.red[600],
      'warning': colors.amber[500],
      'info': colors.sky[600],
      'success': colors.emerald[800],
      'failure': colors.rose[700],
    }
  },
  plugins: [],
}
