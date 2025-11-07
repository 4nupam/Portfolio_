import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme:{
    extend: {
      colors: {
        primary: '#4F46E5',
        accent: '#EC4899',
        surface: '#FFFFFF',
        bg: '#F9FAFB',
      },
      animation: {
      'fade-in': 'fade-in 0.5s ease-out',
    },
    keyframes: {
      'fade-in': {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    },  
  }
})
