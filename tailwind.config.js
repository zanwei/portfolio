/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'mobile': '393px',
      },
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        sans: [
          'ABCDiatype',
          'Inter',
          'Helvetica',
          'Arial',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        serif: [
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2' }], // 40px
        'h2': ['2rem', { lineHeight: '1.25' }],  // 32px
        'h3': ['1.5rem', { lineHeight: '1.3' }], // 24px
        'base': ['1rem', { lineHeight: '1.75' }], // 16px
        'sm': ['0.875rem', { lineHeight: '1.5' }], // 14px
        'xs': ['0.75rem', { lineHeight: '1.5' }], // 12px
        // 响应式字体大小
        'responsive-xs': ['0.75rem', { lineHeight: '1.5' }],
        'responsive-sm': ['0.875rem', { lineHeight: '1.5' }],
        'responsive-base': ['1rem', { lineHeight: '1.6' }],
        'responsive-lg': ['1.125rem', { lineHeight: '1.6' }],
        'responsive-xl': ['1.25rem', { lineHeight: '1.5' }],
        'responsive-2xl': ['1.5rem', { lineHeight: '1.4' }],
      },
      fontWeight: {
        'medium': '500',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 