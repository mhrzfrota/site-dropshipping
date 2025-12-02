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
        display: ['"Segoe UI"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 15px 35px rgba(13, 155, 211, 0.12)',
        card: '0 12px 25px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(120deg, rgba(13, 155, 211, 0.78), rgba(59, 200, 214, 0.68), rgba(243, 237, 228, 0.78))',
      },
    },
  },
  plugins: [],
}
