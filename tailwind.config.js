module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: theme => ({
        'road-img': "url('/src/images/background.png')"
      })
    },
    filter: { // filter-{key}
      'none': 'none',
      'grayscale': 'grayscale(1)',
      'invert': 'invert(1)',
      'sepia': 'sepia(1)',
    },
    backdropFilter: { // backdrop-{key}
      'none': 'none',
      'blur': 'blur(5px)',
    },
  },
  variants: {
    extend: {},
    filter: ['responsive'],
    backdropFilter: ['responsive'],
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}