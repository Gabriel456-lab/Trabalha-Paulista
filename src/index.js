// Ponto de entrada da aplicação React
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importa o CSS com as diretivas do Tailwind
import "./index.css";

// Cria a "raiz" da aplicação dentro da <div id="root"> do public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);