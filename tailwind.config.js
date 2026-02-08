/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ocean: '#0D9BD3',
          deep: '#0A6C93',
          aqua: '#3BC8D6',
          sand: '#F3EDE4',
          sandDark: '#E4D7C6',
        },
        ink: '#0F172A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        raleway: ['"Raleway"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 15px 35px rgba(13, 155, 211, 0.12)',
        card: '0 12px 25px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(120deg, rgba(13, 155, 211, 0.78), rgba(59, 200, 214, 0.68), rgba(243, 237, 228, 0.78))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        'fade-in': 'fade-in 1.1s ease-out both',
      },
    },
  },
  plugins: [],
}
