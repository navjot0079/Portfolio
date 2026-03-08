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
                    DEFAULT: '#0b0b0b',
                    50: '#1a1a1a',
                    100: '#151515',
                    200: '#111111',
                    300: '#0d0d0d',
                    400: '#0b0b0b',
                    500: '#080808',
                    600: '#050505',
                    700: '#030303',
                    800: '#020202',
                    900: '#000000',
                },
                accent: {
                    DEFAULT: '#3a3a3a',
                    light: '#4a4a4a',
                    lighter: '#5a5a5a',
                    dark: '#2a2a2a',
                    darker: '#1a1a1a',
                },
                graphite: {
                    DEFAULT: '#2d2d2d',
                    light: '#3d3d3d',
                    dark: '#1d1d1d',
                },
                charcoal: {
                    DEFAULT: '#36454f',
                    light: '#465560',
                    dark: '#263540',
                },
                slate: {
                    DEFAULT: '#708090',
                    light: '#7890a0',
                    dark: '#607080',
                },
                silver: {
                    DEFAULT: '#a8a8a8',
                    muted: '#888888',
                    light: '#c8c8c8',
                },
                highlight: {
                    blue: '#4a5568',
                    purple: '#553c6b',
                    blueGray: '#5a6a7a',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#a0a0a0',
                    muted: '#6a6a6a',
                    accent: '#888888',
                },
                border: {
                    DEFAULT: '#2a2a2a',
                    light: '#3a3a3a',
                    dark: '#1a1a1a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'heading': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(100, 100, 100, 0.15)',
                'glow-lg': '0 0 40px rgba(100, 100, 100, 0.2)',
                'inner-glow': 'inset 0 0 20px rgba(100, 100, 100, 0.1)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
                'gradient': 'gradient 8s ease infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [],
}
