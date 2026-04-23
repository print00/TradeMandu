/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1726",
        mist: "#6E7A8A",
        canvas: "#F5F1E8",
        card: "#FFFDF8",
        line: "#D9D2C3",
        gain: "#12805C",
        loss: "#C4553C",
        accent: "#1B4D8C",
        gold: "#C6922B"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(14, 23, 38, 0.08)"
      }
    }
  },
  plugins: []
};

