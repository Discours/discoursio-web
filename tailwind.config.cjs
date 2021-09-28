const config = {
  mode: 'jit',
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/filters'),
    require('windicss/plugin/scroll-snap'),
    require('windicss/plugin/typography'),
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          light: '#85d7ff',
          DEFAULT: '#0038FF',
          dark: '#009eeb',
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        },
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#77859B',
          light: '#98A7BF',
          lightest: '#f9fafc',
        },

        green: {
          DEFAULT: '#34C759',
          light: '#25E455',
        },
      },
    },
  },
}

module.exports = config
