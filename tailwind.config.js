/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind vai procurar as classes usadas
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],

  theme: {
    extend: {
      // Cores personalizadas do Trabalha Paulista
      // Uso: bg-verde-escuro, text-verde-botao, border-borda, etc.
      colors: {
        "verde-escuro": "#0f3d2e", // cartão da esquerda e títulos
        "verde-botao": "#0b5d3b",  // botão e links verdes
        fundo: "#f8f6f0",          // fundo da página
        borda: "#e3e1da",          // bordas dos campos
        aba: "#e9efe9",            // fundo das abas
        suave: "#6b6b6b",          // textos secundários
      },

      // Fonte padrão do site
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },

  plugins: [],
};