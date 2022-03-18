const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-full': 'pulse-full 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        small: '10px',
        large: '35px',
      },
      colors: {
        'sky-blue': {
          100: '#d5e9f8',
          200: '#acd4f1',
          300: '#82bee9',
          400: '#59a9e2',
          500: '#2f93db',
          600: '#2676af',
          700: '#1c5883',
          800: '#133b58',
          900: '#091d2c',
        },
        'fairway-green': {
          100: '#dae3d5',
          200: '#b6c7ac',
          300: '#91ac82',
          400: '#6d9059',
          500: '#48742f',
          600: '#3a5d26',
          700: '#2b461c',
          800: '#1d2e13',
          900: '#0e1709',
        },
        'golf-green': {
          100: '#d7e0d5',
          200: '#afc2ab',
          300: '#88a381',
          400: '#608557',
          500: '#38662d',
          600: '#2d5224',
          700: '#223d1b',
          800: '#162912',
          900: '#0b1409',
        },
        'flag-red': {
          100: '#f8dada',
          200: '#f1b5b5',
          300: '#e99090',
          400: '#e26b6b',
          500: '#db4646',
          600: '#af3838',
          700: '#832a2a',
          800: '#581c1c',
          900: '#2c0e0e',
        },
        'sandtrap-white': {
          100: '#f8f8f0',
          200: '#f1f2e2',
          300: '#e9ebd3',
          400: '#e2e5c5',
          500: '#dbdeb6',
          600: '#afb292',
          700: '#83856d',
          800: '#585949',
          900: '#2c2c24',
        },
      },
      fontFamily: {
        sans: ['Red Hat Display', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      keyframes: {
        'pulse-full': {
          '50%': {
            opacity: 0,
          },
        },
      },
      letterSpacing: {
        lg: '1.125rem',
        xl: '1.25rem',
        '3xl': '1.875rem',
        '2xl': '1.5rem',
        '4xl': '2.25rem',
      },
      opacity: {
        35: '.35',
      },
      rotate: {
        22.5: '22.5deg',
      },
    },
  },
  plugins: [],
};
