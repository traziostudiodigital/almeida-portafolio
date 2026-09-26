module.exports = {
  content: [
    './**/*.html',
    './componentes/**/*.html',
    './plantillas/**/*.html',
    './assets/chat-ia.html',
    './assets/css/**/*.css'
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Alex Brush"', 'cursive'],
        'body': ['"Source Serif 4"', 'serif'],
        'sans': ['"Source Serif 4"', 'serif'],
        'base': ['"Source Serif 4"', 'serif']
      },
      colors: {
        'brand-light': '#EAE7E2',
        'brand-dark': '#2E3238',
        'brand-accent': '#B08D57'
      }
    }
  },
  plugins: [],
  mode: 'jit'
}