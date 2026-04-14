/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3B2F',
        bg: '#000000',
        dim: '#1a0000',
        muted: '#660000',
        border: '#330000',
        text: '#ff6b5b',
        bright: '#ff9f97',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 0.4s ease-in-out',
        flicker: 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-3px, -3px)', filter: 'hue-rotate(180deg)' },
          '60%': { transform: 'translate(3px, 3px)', filter: 'hue-rotate(270deg)' },
          '80%': { transform: 'translate(3px, -3px)', filter: 'hue-rotate(0deg)' },
          '100%': { transform: 'translate(0)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
