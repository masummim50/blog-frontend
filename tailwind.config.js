// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef








/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'progress-bar': 'progress-bar 2s linear infinite',
      },
      keyframes: {
        'progress-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
  ]
}