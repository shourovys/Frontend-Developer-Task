import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        primaryLight: 'var(--primaryLight)',
        btnPrimaryText: 'var(--btnPrimaryText)',
        btnOutlineBg: 'var(--btnOutlineBg)',
        btnOutlineText: 'var(--btnOutlineText)',
        primaryBorder: 'var(--box-border)',
      },
      boxShadow: {
        table: '0px 3px 10px 0px #7777771A',
        dropDown: '0px 4px 30px 0px #2E2D741A',
        box: '0px 4px 30px 0px #2E2D741A',
      },

      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
