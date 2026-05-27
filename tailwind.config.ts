import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF5',
          100: '#F7F0E4',
          200: '#EDE0CC',
          300: '#E0CEAD',
        },
        gold: {
          300: '#D4A96A',
          400: '#C49355',
          500: '#A87A3E',
          600: '#8B6432',
        },
        stone: {
          50:  '#FAFAF9',
          100: '#F5F3EE',
          200: '#E8E4DB',
          400: '#B8AFA0',
          600: '#7A7065',
          800: '#3D3730',
          900: '#1C1810',
        },
        success: '#5C8A6E',
        error:   '#B05050',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.8rem, 3.5vw, 2.8rem)', { lineHeight: '1.15' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.75' }],
        'body-md':    ['1rem', { lineHeight: '1.7' }],
        'label':      ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.12em' }],
      },
      spacing: {
        'section':       'clamp(5rem, 10vw, 8rem)',
        'section-sm':    'clamp(3rem, 6vw, 5rem)',
        'container-pad': 'clamp(1.5rem, 5vw, 5rem)',
      },
      maxWidth: {
        container: '1440px',
      },
      animation: {
        'pulse-ring':   'pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'bounce-dot':   'bounce-dot 1.4s infinite',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%':         { transform: 'scale(1)', opacity: '1' },
          '80%, 100%':  { transform: 'scale(2.5)', opacity: '0' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%':           { transform: 'translateY(-12px)' },
        },
        'fade-in-down': {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
