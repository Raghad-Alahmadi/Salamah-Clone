/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#f7f7f7',
      },
      backgroundImage: {
        'custom-bg': "url('assets/outer-bg.321110dec68f8427.svg')",
      },
    },
  },
  plugins: [],
}

