import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
    },
  },
  plugins: [],
};
export default config;
