const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: [
      './src/components/**/*.tsx',
    ]
  },

  theme: {
    extend: {
      fontFamily: {
        // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // 'primary-green': 'rgb(0, 128, 96)',
        // 'primary-violet': '#5563c1'
      }
    }
  },
  darkMode: 'class',

  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
