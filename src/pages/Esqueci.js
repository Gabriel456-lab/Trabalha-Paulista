import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const inputClass = 'mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0d5c3a] focus:ring-1 focus:ring-[#0d5c3a]';

function Esqueci() {
  const navigate = useNavigate();
  const { hasAccount, updatePassword } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [emailEncontrado, setEmailEncontrado] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const verificarEmail = (evento) => {
    evento.preventDefault();
    setMensagemErro('');
    try {
      if (!hasAccount(email)) {
        setEmailEncontrado(false);
        setMensagemErro('Não encontramos uma conta com este e-mail.');
        return;
      }
      setEmailEncontrado(true);
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível verificar o e-mail.');
    }
  };

  const redefinirSenha = (evento) => {
    evento.preventDefault();
    setMensagemErro('');
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(senha)) {
      setMensagemErro('Use pelo menos 8 caracteres, com letras e números.');
      return;
    }
    if (senha !== confirmaSenha) {
      setMensagemErro('As senhas não coincidem.');
      return;
    }

    try {
      updatePassword(email, senha);
      navigate('/login', { state: { passwordReset: true, email } });
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível alterar a senha.');
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f8f7f2] px-4 pb-16 pt-28">
      <section className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-card sm:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Recuperação de acesso</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0f3d2a]">Esqueceu sua senha?</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Informe o e-mail cadastrado para localizar sua conta e definir uma nova senha.
        </p>

        <div className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Este é um protótipo local: a verificação é feita neste navegador e não envia um código para o e-mail.
        </div>

        {mensagemErro && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{mensagemErro}</p>}

        {!emailEncontrado ? (
          <form onSubmit={verificarEmail} className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-gray-900" htmlFor="email-recuperacao">
              E-mail cadastrado
              <input
                id="email-recuperacao"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="seunome@exemplo.com"
                className={inputClass}
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-[#0d5c3a] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a2f]">
              Verificar e-mail
            </button>
          </form>
        ) : (
          <form onSubmit={redefinirSenha} className="mt-6 space-y-5">
            <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
              Conta encontrada para <strong>{email}</strong>. Defina uma nova senha.
            </p>
            <label className="block text-sm font-semibold text-gray-900" htmlFor="nova-senha">
              Nova senha
              <input
                id="nova-senha"
                type="password"
                required
                autoComplete="new-password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-semibold text-gray-900" htmlFor="confirmar-senha">
              Confirme a nova senha
              <input
                id="confirmar-senha"
                type="password"
                required
                autoComplete="new-password"
                value={confirmaSenha}
                onChange={(evento) => setConfirmaSenha(evento.target.value)}
                className={inputClass}
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-[#0d5c3a] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a2f]">
              Salvar nova senha
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Lembrou a senha? <a href="/login" className="font-semibold text-[#0d5c3a] hover:underline">Voltar ao login</a>
        </p>
      </section>
    </main>
  );
}

export default Esqueci;
