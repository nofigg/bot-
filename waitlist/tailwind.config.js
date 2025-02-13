/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      textShadow: {
        'glow': '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        'hexagon-pattern': `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L12 28L24 40L24 24L12 12L0 24L0 40z M0 0L12 12L24 0L24 16L12 28L0 16L0 0z' fill='rgba(59, 130, 246, 0.1)'/%3E%3C/svg%3E")`,
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      animation: {
        'bootSequence': 'bootSequence 2s ease-out forwards',
        'arcReactor': 'arcReactor 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'text-glow': 'textGlow 2s ease-in-out infinite',
        'rotate': 'rotate 10s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        textGlow: {
          '0%, 100%': {
            'text-shadow': '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            'text-shadow': '0 0 15px rgba(59, 130, 246, 0.7), 0 0 25px rgba(59, 130, 246, 0.5), 0 0 35px rgba(59, 130, 246, 0.3)',
          },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
}
