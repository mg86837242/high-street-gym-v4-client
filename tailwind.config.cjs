/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Adding Custom Styles – Customizing your theme: https://tailwindcss.com/docs/adding-custom-styles#customizing-your-theme
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        headline:
          'Righteous, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        logo: 'Permanent Marker, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      },
      screens: {
        '3xl': '1920px',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
            },
          },
        },
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    // Daisy UI themes – How to customize an existing theme: https://daisyui.com/docs/themes/#-7
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#6366F1', // indigo-500
          'primary-focus': '#4338CA', // indigo-700
          secondary: '#8b5cf6', // violet-500
          'secondary-focus': '#6d28d9', // violet-700
          accent: '#000',
          'accent-focus': '#000',
        },
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#8b5cf6', // violet-500
          'primary-focus': '#6d28d9', // violet-700
          secondary: '#6366F1', // indigo-500
          'secondary-focus': '#4338CA', // indigo-700
          accent: '#fff',
          'accent-focus': '#fff',
        },
      },
    ],
  },
};
