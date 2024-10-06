/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0087FF',
        lightAvatar: '#E6FFF3',
        darkAvatarText: '#1AC96F',
        backgroundLight: '#EAF4FB',
        error: '#FC4236',
        background: '#fff',
        text: '#000',
        lightText: '#C5C5C7',
        border: '#F5F6F8',
      },
    },
  },
  plugins: [],
};
