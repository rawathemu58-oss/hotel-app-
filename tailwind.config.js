export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#C2361F', dark: '#9E2813', soft: '#FDEDE8' }, ink: '#2B201B', paper: '#FFFCF9' },
      fontFamily: { display: ['Fraunces', 'Georgia', 'serif'], sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
