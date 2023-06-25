module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
  variants: {
    extend: {
      fontWeight: ['responsive', 'hover', 'focus'],
      opacity: ['hover', 'group-hover'],
      borderColor: ['hover', 'focus'],
      margin: ['first', 'last'],
      backgroundColor: ['odd', 'even', 'group-hover'],
      scale: ['hover', 'active', 'group-hover'],
      textColor: ['group-hover'],
    },
  },
  theme: {
    extend: {
      fontSize: {
        sm: ['0.8125rem', { lineHeight: '1.2rem' }],
      },
      animation: {
        fadeIn: '0.3s ease 0.2s 1 normal both running fadeIn',
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
      },
    },
  },
}
