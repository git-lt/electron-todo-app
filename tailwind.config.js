module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  variants: {
    extend: {
      fontWeight: ['responsive', 'hover', 'focus'],
      opacity: ['hover', 'group-hover'],
      borderColor: ['hover', 'focus'],
      margin: ['first', 'last'],
      backgroundColor: ['odd', 'even', 'group-hover'],
      scale: ['hover', 'active', 'group-hover'],
      textColor: ['group-hover'],
      transform: ['group-hover'],
    },
  },
  theme: {
    extend: {
      fontSize: {
        sm: ['0.8125rem', { lineHeight: '1.2rem' }],
        md: ['0.875rem', { lineHeight: '1.25rem' }],
      },
      animation: {
        fadeIn: '0.3s ease 0.2s 1 normal both running fadeIn',
        flipInX: '0.4s linear 0.2s 1 normal both running flipInX',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            'opacity': 0,
            'transform': 'translate(0px, -10px)',
            'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          },
          '100%': {
            opacity: 1,
            transform: 'none',
          },
        },
        flipInX: {
          'from': {
            'transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            'animation-timing-function': 'ease-in',
            'opacity': 0,
          },

          '40%': {
            'transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            'animation-timing-function': 'ease-in',
          },

          '60%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            opacity: 1,
          },

          '80%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
          },
          'to': {
            transform: 'perspective(400px)',
          },
        },
      },
    },
  },
}
