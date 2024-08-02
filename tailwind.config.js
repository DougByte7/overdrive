/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    700: '#670098',
                    500: '#8100be',
                    200: '#f6f0fa',
                },
                support: {
                    300: 'var(--do_color_support_light_10)',
                    400: 'var(--do_color_support_dark_30)',
                    600: 'var(--do_color_support_dark_60)',
                },
            },
            fontFamily: {
                germaniaOne : ['Germania One']
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar'),
    ],
}
