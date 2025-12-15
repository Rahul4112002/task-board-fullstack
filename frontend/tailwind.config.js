/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brutal: {
          black: "#000000",
          white: "#FFFFFF",
          red: "#FF0000",
          "red-dark": "#CC0000",
          "red-light": "#FF3333",
          gray: "#E5E5E5",
          "gray-dark": "#999999",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "6px 6px 0px 0px #000000",
        "brutal-sm": "3px 3px 0px 0px #000000",
        "brutal-lg": "10px 10px 0px 0px #000000",
        "brutal-red": "6px 6px 0px 0px #FF0000",
        "brutal-red-lg": "10px 10px 0px 0px #FF0000",
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-in",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        pop: "pop 0.3s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        pop: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
