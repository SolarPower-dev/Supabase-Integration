/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'desert': {
          50: '#FDF8F1',
          100: '#F5F1E8',
          200: '#E8DDD0',
          300: '#D4C4AB',
          400: '#B8A082',
          500: '#A08660',
          600: '#8B7355',
          700: '#6B5A45',
          800: '#4A3F32',
          900: '#2D251C'
        },
        'sunset': {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFCCAA',
          300: '#FFA574',
          400: '#FF8A50',
          500: '#FF6B1A',
          600: '#E55100',
          700: '#BF360C',
          800: '#8D2F00',
          900: '#5D1F00'
        },
        'teal': {
          50: '#F0F9F9',
          100: '#E0F2F2',
          200: '#B8E0E0',
          300: '#8CCBCB',
          400: '#5D8A8A',
          500: '#4A7C7C',
          600: '#3D6B6B',
          700: '#2F5454',
          800: '#233D3D',
          900: '#172828'
        }
      },
      fontFamily: {
        'display': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'body': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    },
  },
  plugins: [],
};