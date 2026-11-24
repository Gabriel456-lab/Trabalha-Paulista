/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Diz ao Tailwind para escanear todos os arquivos JS/JSX dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Diz ao Tailwind para escanear todos os arquivos JS/JSX dentro de src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#075e36",
        ink: "#123d2c",
        body: "#202d25",
        muted: "#677068",
        accent: "#57321e",
        mint: "#eaf0e6",
        line: "#dee3da",
        page: "#ffffff",
      },
      boxShadow: {
        card: "0 12px 36px 0 rgba(22, 60, 37, 0.07)",
      },
    },
  },
  plugins: [],
};
