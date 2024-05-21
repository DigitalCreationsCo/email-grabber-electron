module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    themes: ['corporate', 'black'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
