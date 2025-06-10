/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rich_black: {
          DEFAULT: '#011627',
          100: '#000408',
          200: '#000910',
          300: '#010d18',
          400: '#011220',
          500: '#011627',
          600: '#034a83',
          700: '#067ddf',
          800: '#48aafa',
          900: '#a4d5fd',
        },
        folly: {
          DEFAULT: '#ff3366',
          100: '#3d000f',
          200: '#7a001f',
          300: '#b8002e',
          400: '#f5003d',
          500: '#ff3366',
          600: '#ff5c85',
          700: '#ff85a3',
          800: '#ffadc2',
          900: '#ffd6e0',
        },
        light_sea_green: {
          DEFAULT: '#2ec4b6',
          100: '#092724',
          200: '#124e48',
          300: '#1b746c',
          400: '#249b8f',
          500: '#2ec4b6',
          600: '#50d6c9',
          700: '#7ce0d6',
          800: '#a7eae4',
          900: '#d3f5f1',
        },
        seasalt: {
          DEFAULT: '#f6f7f8',
          100: '#2c3137',
          200: '#57636f',
          300: '#8894a1',
          400: '#bfc6cd',
          500: '#f6f7f8',
          600: '#f8f9fa',
          700: '#fafafb',
          800: '#fcfcfc',
          900: '#fdfdfe',
        },
        celestial_blue: {
          DEFAULT: '#20a4f3',
          100: '#032234',
          200: '#064469',
          300: '#08669d',
          400: '#0b89d1',
          500: '#20a4f3',
          600: '#4db8f6',
          700: '#79caf8',
          800: '#a6dbfa',
          900: '#d2edfd',
        },
      },
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}