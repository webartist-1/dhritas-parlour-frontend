// tailwind.config.mjs
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0078d4', // Microsoft blue
        secondary: '#106ebe',
        light: '#f3f2f1',
        dark: '#201f1e',
        fluentBlue: '#0078D4',
        fluentBlueDark: '#106EBE',
        fluentYellow: '#FFB900',
        softGray: '#f5f7fa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
};
