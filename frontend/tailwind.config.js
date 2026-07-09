/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        bgTertiary: 'var(--bg-tertiary)',
        accentPrimary: 'var(--accent-primary)',
        accentSecondary: 'var(--accent-secondary)',
        warning: 'var(--accent-warning)',
        danger: 'var(--accent-danger)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        borderColor: 'var(--border-color)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}