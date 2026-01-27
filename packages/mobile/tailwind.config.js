/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        foreground: "rgb(var(--color-text-primary) / <alpha-value>)",
        'foreground-secondary': "rgb(var(--color-text-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
      }
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": {
          "--color-background": "255 255 255",
          "--color-surface": "243 244 246",
          "--color-primary": "139 92 246",
          "--color-text-primary": "88 28 135",
          "--color-text-secondary": "31 41 55",
          "--color-accent": "13 148 136",
          "--color-border": "229 231 235",
          "--color-tab-active": "139 92 246",
          "--color-tab-inactive": "156 163 175",
        },
      }),
  ],
};
