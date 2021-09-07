module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.css',
  ],
  darkMode: false,
  theme: {
    screens: {
      'sm': '319px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'mobile': [
        {'min': '319px', 'max': '1023px'}
      ],

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}