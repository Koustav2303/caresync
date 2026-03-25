/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff', // Softest blue
          100: '#dbeafe',
          500: '#3b82f6', // Main brand blue
          600: '#2563eb', // Hover blue
          900: '#1e3a8a', // Deep blue for text
        },
        success: {
          50: '#f0fdf4', // Soft green
          500: '#22c55e', // Subtle brand green
          600: '#16a34a',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a', // For dark mode later
        },
        gray: {
          50: '#f8fafc', // App background
          100: '#f1f5f9', // Card background
          800: '#1e293b', // Primary text
          500: '#64748b', // Secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}