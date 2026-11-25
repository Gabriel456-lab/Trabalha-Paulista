import React, { useState } from 'react';
import logo from '../img/logo.svg';
import foto from '../img/cadastro.jpg';

const bairros = ['Centro', 'Janga', 'Paratibe', 'Maranguape I', 'Maranguape II', 'Jardim Paulista', 'Pau Amarelo', 'Outro'];

const PATHS = {
  back: 'M19 12H5M11 6l-6 6 6 6',
  arrow: 'M7 17L17 7M7 7h10v10',
  mail: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 7l9 6 9-6',
  down: 'M6 9l6 6 6-6',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeOff: 'M3 3l18 18M10.6 5.1A9.7 9.7 0 0112 5c6 0 10 7 10 7a17 17 0 01-3.2 4M6.6 6.6A17 17 0 002 12s4 7 10 7a9.7 9.7 0 004.4-1M9.9 9.9a3 3 0 004.2 4.2',
  check: 'M22 11.1V12a10 10 0 11-5.9-9.1M22 4L12 14l-3-3',
};

function Icon({ name, className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#0d5c3a] focus:ring-1 focus:ring-[#0d5c3a]';

function Campo({ label, erro, children, dica }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>
      {children}
      {dica && !erro && <p className="mt-2 text-xs text-gray-500">{dica}</p>}
      {erro && <p className="mt-2 text-xs text-red-600">{erro}</p>}
    </div>
  );
}

function Cadastro() {
  const [f, setF] = useState({ nome: '', email: '', celular: '', bairro: '', senha: '', confirma: '', aceito: false });
  const [ver, setVer] = useState({ senha: false, confirma: false });
  const [erros, setErros] = useState({});

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const mascaraCelular = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    setF({ ...f, celular: v });
  };

  const validar = () => {
    const e = {};
    if (f.nome.trim().length < 3) e.nome = 'Informe seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Informe um e-mail válido.';
    if (f.celular.replace(/\D/g, '').length < 10) e.celular = 'Informe um celular válido.';
    if (!f.bairro) e.bairro = 'Selecione seu bairro.';
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(f.senha)) e.senha = 'Use pelo menos 8 caracteres, com letras e números.';
    if (f.confirma !== f.senha) e.confirma = 'As senhas não coincidem.';
    if (!f.aceito) e.aceito = 'Você precisa aceitar os termos para continuar.';
    return e;
  };

  const enviar = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErros(e);
    if (Object.keys(e).length === 0) {
      // TODO: integrar com sua API / backend
      console.log('Cadastro válido:', { ...f, senha: undefined, confirma: undefined });
    }
  };

  const borda = (k) => (erros[k] ? 'border-red-400' : 'border-gray-200');

  const renderSenha = (campo, placeholder) => (
    <div className="relative">
      <input
        type={ver[campo] ? 'text' : 'password'}
        value={f[campo]}
        onChange={set(campo)}
        placeholder={placeholder}
        autoComplete="new-password"
        className={`${inputBase} pr-11 ${borda(campo)}`}
      />
      <button
        type="button"
        onClick={() => setVer({ ...ver, [campo]: !ver[campo] })}
        aria-label={ver[campo] ? 'Ocultar senha' : 'Mostrar senha'}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#0d5c3a]"
      >
        <Icon name={ver[campo] ? 'eye' : 'eyeOff'} className="w-[18px] h-[18px]" />
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f2] font-sans text-gray-900">
      {/* topo */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4">
          <a href="/"><img src={logo} alt="Trabalha Paulista" className="h-14 w-auto" /></a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-medium text-[#0d5c3a] hover:underline">
            <Icon name="back" className="w-3.5 h-3.5" /> Voltar para o início
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-14 lg:grid-cols-2">
          {/* painel esquerdo */}
          <aside className="hidden overflow-hidden rounded-b-[2rem] lg:block">
            <img src={foto} alt="Mulher sorrindo em sua loja de plantas" className="h-[25rem] w-full object-cover" />
            <div className="bg-[#103d2b] px-8 pb-16 pt-9 text-white">
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">Feito para Paulista–PE</p>
              <h2 className="mt-5 text-3xl font-medium leading-tight">O próximo passo da sua história começa por aqui.</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                Encontre oportunidades perto de você e mostre o seu talento para quem está contratando.
              </p>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/80">
                <Icon name="check" className="w-4 h-4" /> Cadastro gratuito para candidatos
              </p>
            </div>
          </aside>

          {/* formulário */}
          <section className="w-full max-w-md lg:mt-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Cadastro de usuário</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#0f3d2a] md:text-4xl">Seu próximo passo começa aqui.</h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Crie sua conta gratuita de candidato. Depois, você poderá completar seu perfil e buscar vagas.
            </p>

            <form onSubmit={enviar} noValidate className="mt-8 space-y-5">
              <Campo label="Nome completo" erro={erros.nome}>
                <input value={f.nome} onChange={set('nome')} placeholder="Como você se chama?" autoComplete="name" className={`${inputBase} ${borda('nome')}`} />
              </Campo>

              <Campo label="E-mail" erro={erros.email}>
                <div className="relative">
                  <input type="email" value={f.email} onChange={set('email')} placeholder="seunome@exemplo.com" autoComplete="email" className={`${inputBase} pr-11 ${borda('email')}`} />
                  <Icon name="mail" className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600" />
                </div>
              </Campo>

              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Celular" erro={erros.celular}>
                  <input value={f.celular} onChange={mascaraCelular} placeholder="(81) 99999-9999" inputMode="tel" autoComplete="tel" className={`${inputBase} ${borda('celular')}`} />
                </Campo>
                <Campo label="Bairro" erro={erros.bairro}>
                  <div className="relative">
                    <select value={f.bairro} onChange={set('bairro')} className={`${inputBase} appearance-none pr-10 ${borda('bairro')} ${f.bairro ? '' : 'text-gray-400'}`}>
                      <option value="">Selecione seu bairro</option>
                      {bairros.map((b) => (<option key={b} value={b}>{b}</option>))}
                    </select>
                    <Icon name="down" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                  </div>
                </Campo>
              </div>

              <Campo label="Crie uma senha" erro={erros.senha} dica="Use pelo menos 8 caracteres, com letras e números.">
                {renderSenha('senha', 'Digite sua senha')}
              </Campo>

              <Campo label="Confirme sua senha" erro={erros.confirma}>
                {renderSenha('confirma', 'Digite a senha novamente')}
              </Campo>

              <div>
                <label className="flex items-start gap-3 text-xs leading-relaxed text-gray-600">
                  <input type="checkbox" checked={f.aceito} onChange={set('aceito')} className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#0d5c3a]" />
                  <span>
                    Li e concordo com os <a href="/termos" className="font-semibold text-[#0d5c3a] hover:underline">Termos de uso</a> e a{' '}
                    <a href="/privacidade" className="font-semibold text-[#0d5c3a] hover:underline">Política de Privacidade</a> do Trabalha Paulista.
                  </span>
                </label>
                {erros.aceito && <p className="mt-2 text-xs text-red-600">{erros.aceito}</p>}
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0d5c3a] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a2f]">
                Criar minha conta gratuita <Icon name="arrow" className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta? <a href="/login" className="font-semibold text-[#0d5c3a] hover:underline">Entrar</a>
            </p>
            <p className="mt-4 text-center text-xs text-gray-500">
              Quer contratar?{' '}
              <a href="/empresa" className="inline-flex items-center gap-1 font-semibold text-[#0d5c3a] hover:underline">
                Conheça a área para empresas <Icon name="arrow" className="w-3 h-3" />
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* rodapé */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-gray-500">
          <span>© 2026 Trabalha Paulista · Paulista–PE</span>
          <nav className="flex gap-5">
            <a href="/privacidade" className="hover:text-[#0d5c3a]">Privacidade</a>
            <a href="/termos" className="hover:text-[#0d5c3a]">Termos de uso</a>
            <a href="/ajuda" className="hover:text-[#0d5c3a]">Ajuda</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Cadastro;