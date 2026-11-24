import React, { useState } from "react";

/* ==========================================================
   ÍCONES (SVG inline – não precisa instalar nenhuma biblioteca)
   ========================================================== */

// Seta para a esquerda (link "Voltar para o início")
const IconeSetaEsquerda = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Envelope (campo de e-mail)
const IconeEmail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

// Olho aberto / olho riscado (mostrar e ocultar senha)
const IconeOlho = ({ riscado }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
    {riscado && <line x1="3" y1="3" x2="21" y2="21" />}
  </svg>
);

// Seta diagonal (botão "Entrar na minha conta")
const IconeSetaDiagonal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </svg>
);

// Círculo com check (texto "Cadastro gratuito para candidatos")
const IconeCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

// Círculo com interrogação (texto de ajuda)
const IconeAjuda = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ==========================================================
   CLASSES REUTILIZADAS
   (guardadas em constantes para não repetir texto no JSX)
   ========================================================== */

// Rótulo acima dos campos ("E-mail", "Senha")
const classeRotulo = "mb-2 block text-[11px] font-semibold";

// Caixa de texto (input)
const classeInput =
  "h-10 w-full rounded-lg border border-borda bg-white pl-3.5 pr-10 text-[11px] " +
  "placeholder:text-neutral-400 focus:border-verde-botao focus:outline-none";

// Ícone posicionado dentro do campo, no canto direito
const classeIconeCampo =
  "absolute right-3.5 top-1/2 flex -translate-y-1/2 text-neutral-700";

// Classes base das abas (a cor muda conforme a aba ativa)
const classeAbaBase =
  "h-[34px] flex-1 rounded-lg text-[11px] transition";

/* ==========================================================
   COMPONENTE PRINCIPAL
   ========================================================== */
function Login() {
  // Qual aba está ativa: "candidato" ou "empresa"
  const [tipoUsuario, setTipoUsuario] = useState("candidato");

  // Campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  // Controla se a senha aparece em texto ou escondida
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Função chamada quando o formulário é enviado
  const handleSubmit = (evento) => {
    evento.preventDefault(); // evita recarregar a página

    // TODO: aqui você vai chamar sua API de login
    console.log({ tipoUsuario, email, senha, lembrar });
  };

  // Retorna as classes da aba conforme ela esteja ativa ou não
  const classeAba = (tipo) =>
    tipoUsuario === tipo
      ? `${classeAbaBase} bg-white font-semibold text-verde-botao shadow-sm`
      : `${classeAbaBase} font-medium text-suave`;

  return (
    <div className="flex min-h-screen flex-col">

      {/* ================= CABEÇALHO ================= */}
      <header className="border-b border-borda bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1000px] items-center justify-between px-5 md:px-[52px]">
          {/* Logo – arquivo em public/logo.svg */}
          <img
            className="h-[60px] w-auto"
            src={process.env.PUBLIC_URL + "/logo.svg"}
            alt="Trabalha Paulista"
          />

          <a href="/" className="flex items-center gap-2 text-xs text-verde-botao">
            <IconeSetaEsquerda />
            Voltar para o início
          </a>
        </div>
      </header>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      {/* Celular: uma coluna (formulário em cima). Desktop: duas colunas */}
      <main className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col-reverse items-center gap-8 px-5 py-6 md:flex-row md:items-start md:justify-between md:gap-16 md:px-[52px] md:py-9">

        {/* ----- Cartão da esquerda (foto + texto) ----- */}
        <section className="w-full max-w-[420px] shrink-0 overflow-hidden rounded-[20px] bg-verde-escuro md:w-[395px]">
          {/* Foto – arquivo em public/foto-login.svg */}
          <img
            className="block h-[255px] w-full object-cover"
            src={process.env.PUBLIC_URL + "/foto-login.svg"}
            alt="Mulher sorrindo em uma loja de plantas"
          />

          <div className="px-7 pb-10 pt-7 text-white">
            <span className="text-[9px] tracking-[0.5px] opacity-[0.85]">
              FEITO PARA PAULISTA–PE
            </span>

            <h2 className="mb-4 mt-3.5 text-[26px] font-semibold leading-[1.2]">
              O próximo passo da sua história começa por aqui.
            </h2>

            <p className="mb-4 text-xs leading-relaxed opacity-[0.85]">
              Encontre oportunidades perto de você e mostre o seu talento
              para quem está contratando.
            </p>

            <p className="flex items-center gap-2 text-[10px] opacity-90">
              <IconeCheck />
              Cadastro gratuito para candidatos
            </p>
          </div>
        </section>

        {/* ----- Formulário da direita ----- */}
        <section className="w-full max-w-[420px] md:w-[315px] md:pt-10">
          <span className="text-[9px] font-semibold tracking-[0.4px] text-[#5a3b1e]">
            LOGIN · ÁREA RESTRITA
          </span>

          <h1 className="mb-3 mt-2.5 text-[26px] font-semibold text-verde-escuro">
            Bom ter você de volta.
          </h1>

          <p className="mb-[22px] text-xs leading-relaxed text-suave">
            Entre para encontrar oportunidades e acompanhar cada passo das
            suas candidaturas.
          </p>

          {/* Abas: Sou candidato / Sou empresa */}
          <div className="mb-[22px] flex rounded-[10px] bg-aba p-1">
            <button
              type="button"
              className={classeAba("candidato")}
              onClick={() => setTipoUsuario("candidato")}
            >
              Sou candidato
            </button>

            <button
              type="button"
              className={classeAba("empresa")}
              onClick={() => setTipoUsuario("empresa")}
            >
              Sou empresa
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>

            {/* Campo: E-mail */}
            <label className={classeRotulo} htmlFor="email">E-mail</label>
            <div className="relative mb-[18px]">
              <input
                id="email"
                type="email"
                className={classeInput}
                placeholder="seunome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className={classeIconeCampo}><IconeEmail /></span>
            </div>

            {/* Campo: Senha */}
            <label className={classeRotulo} htmlFor="senha">Senha</label>
            <div className="relative mb-[18px]">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                className={classeInput}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              {/* Botão do olho: alterna entre mostrar/ocultar a senha */}
              <button
                type="button"
                className={classeIconeCampo}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                <IconeOlho riscado={!mostrarSenha} />
              </button>
            </div>

            {/* Lembrar de mim + Esqueci minha senha */}
            <div className="mb-3.5 flex items-center justify-between">
              <label className="flex items-center gap-2 text-[10px] text-suave">
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                />
                Lembrar de mim
              </label>

              <a href="/recuperar-senha" className="text-[10px] font-semibold text-verde-botao">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão principal */}
            <button
              type="submit"
              className="flex h-[38px] w-full items-center justify-center gap-2.5 rounded-md bg-verde-botao text-[11px] font-semibold text-white transition hover:bg-verde-escuro"
            >
              Entrar na minha conta
              <IconeSetaDiagonal />
            </button>
          </form>

          {/* Link de cadastro */}
          <p className="mt-4 text-center text-[11px] text-suave">
            Ainda não tem uma conta?{" "}
            <a href="/cadastro" className="font-semibold text-verde-botao">
              Cadastre-se grátis
            </a>
          </p>

          <hr className="my-4 border-t border-borda" />

          {/* Ajuda */}
          <p className="flex items-center justify-center gap-1.5 text-[9px] text-suave">
            <IconeAjuda />
            Precisa de ajuda para entrar? Acesse a central de ajuda.
          </p>
        </section>
      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="border-t border-borda bg-white">
        <div className="mx-auto flex h-10 max-w-[1000px] items-center justify-between px-5 text-[9px] text-suave md:px-[52px]">
          <span>© 2026 Trabalha Paulista · Paulista–PE</span>

          <nav className="flex gap-2.5">
            <a href="/privacidade">Privacidade</a>
            <span>·</span>
            <a href="/termos">Termos de uso</a>
            <span>·</span>
            <a href="/ajuda">Ajuda</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Login;
