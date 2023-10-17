import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#f8f7f6',
          100: '#f2f1ef',
          200: '#e0ddd8',
          300: '#cdc7c0',
          400: '#a9a39b',
          500: '#858079',
          600: '#77726d',
          700: '#66615b',
          800: '#555049',
          900: '#454137',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdfbf6',
          200: '#fbf8e6',
          300: '#f9f5d6',
          400: '#f6f0b7',
          500: '#f3eb98',
          600: '#e3d88a',
          700: '#c4b974',
          800: '#a5995e',
          900: '#867a49',
        },
        silver: {
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#e6e6e6',
          300: '#d9d9d9',
          400: '#bfbfbf',
          500: '#a6a6a6',
          600: '#999999',
          700: '#808080',
          800: '#666666',
          900: '#4d4d4d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
