import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import foto from '../img/cadastro.jpg';
import { useAuth } from '../auth/AuthContext';

const PATHS = {
  arrow: 'M7 17L17 7M7 7h10v10',
  mail: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 7l9 6 9-6',
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

function Campo({ label, erro, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>
      {children}
      {erro && <p className="mt-2 text-xs text-red-600">{erro}</p>}
    </div>
  );
}

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tipoUsuario, setTipoUsuario] = useState(location.state?.tipoCadastro || 'candidato');
  const [f, setF] = useState({ email: location.state?.email || '', senha: '', lembrar: false });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [erroLogin, setErroLogin] = useState('');

  const set = (campo) => (evento) =>
    setF({
      ...f,
      [campo]: evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value,
    });

  const validar = () => {
    const novosErros = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) novosErros.email = 'Informe um e-mail válido.';
    if (!f.senha) novosErros.senha = 'Informe sua senha.';
    return novosErros;
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length === 0) {
      try {
        const user = login(f.email, f.senha, tipoUsuario, f.lembrar);
        const requestedPath = location.state?.from?.pathname;
        const rolePath = user.tipoCadastro === 'empresa' ? '/empresa' : '/vagas';
        const nextPath = requestedPath === rolePath ? `${requestedPath}${location.state?.from?.search || ''}` : rolePath;
        navigate(nextPath, { replace: true });
      } catch (error) {
        setErroLogin(error instanceof Error ? error.message : 'Não foi possível entrar na conta.');
      }
    }
  };

  const borda = (campo) => (erros[campo] ? 'border-red-400' : 'border-gray-200');

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f2] font-sans text-gray-900">
      <main className="mt-20 flex-1">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-14 lg:grid-cols-2">
          <aside className="w-full overflow-hidden rounded-[2rem]">
            <img src={foto} alt="Mulher sorrindo em sua loja de plantas" className="h-56 w-full object-cover sm:h-72 lg:h-[25rem]" />
            <div className="bg-[#103d2b] px-8 pb-16 pt-9 text-white">
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">Feito para Paulista–PE</p>
              <h2 className="mt-5 text-3xl font-medium leading-tight">O próximo passo da sua história começa por aqui.</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                Encontre oportunidades perto de você e acompanhe cada etapa das suas candidaturas.
              </p>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/80">
                <Icon name="check" className="w-4 h-4" /> Acesso gratuito para candidatos
              </p>
            </div>
          </aside>

          <section className="w-full max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Login · Área restrita</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#0f3d2a] md:text-4xl">Bom ter você de volta.</h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Entre para encontrar oportunidades e acompanhar o andamento das suas candidaturas.
            </p>

            <div className="mt-8 flex rounded-lg bg-[#ecece6] p-1">
              <button
                type="button"
                onClick={() => setTipoUsuario('candidato')}
                className={`flex-1 rounded-md px-4 py-2.5 text-sm transition ${tipoUsuario === 'candidato' ? 'bg-white font-semibold text-[#0d5c3a] shadow-sm' : 'font-medium text-gray-500'}`}
              >
                Sou candidato
              </button>
              <button
                type="button"
                onClick={() => setTipoUsuario('empresa')}
                className={`flex-1 rounded-md px-4 py-2.5 text-sm transition ${tipoUsuario === 'empresa' ? 'bg-white font-semibold text-[#0d5c3a] shadow-sm' : 'font-medium text-gray-500'}`}
              >
                Sou empresa
              </button>
            </div>

            <form onSubmit={enviar} noValidate className="mt-6 space-y-5">
              {location.state?.registrationComplete && (
                <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                  Cadastro concluído. Entre com seu e-mail e senha.
                </p>
              )}
              {location.state?.passwordReset && (
                <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                  Senha alterada. Entre com sua nova senha.
                </p>
              )}
              {erroLogin && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{erroLogin}</p>}

              <Campo label="E-mail" erro={erros.email}>
                <div className="relative">
                  <input
                    type="email"
                    value={f.email}
                    onChange={set('email')}
                    placeholder="seunome@exemplo.com"
                    autoComplete="email"
                    className={`${inputBase} pr-11 ${borda('email')}`}
                  />
                  <Icon name="mail" className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600" />
                </div>
              </Campo>

              <Campo label="Senha" erro={erros.senha}>
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={f.senha}
                    onChange={set('senha')}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className={`${inputBase} pr-11 ${borda('senha')}`}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#0d5c3a]"
                  >
                    <Icon name={mostrarSenha ? 'eye' : 'eyeOff'} className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </Campo>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={f.lembrar}
                    onChange={set('lembrar')}
                    className="h-4 w-4 rounded border-gray-300 accent-[#0d5c3a]"
                  />
                  Lembrar de mim
                </label>
                <a href="/esqueci-senha" className="text-xs font-semibold text-[#0d5c3a] hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0d5c3a] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a2f]">
                Entrar na minha conta <Icon name="arrow" className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Ainda não tem uma conta? <a href="/cadastro" className="font-semibold text-[#0d5c3a] hover:underline">Cadastre-se grátis</a>
            </p>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
              Precisa de ajuda para entrar? <a href="/#ajuda" className="font-semibold text-[#0d5c3a] hover:underline">Acesse a ajuda</a>
            </p>
          </section>
        </div>
      </main>

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

export default Login;