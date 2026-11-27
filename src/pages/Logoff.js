import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Logoff() {
  const navigate = useNavigate();
  const { user, logout, deleteAccount } = useAuth();
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [redirecionando, setRedirecionando] = useState(false);

  const sair = () => {
    setRedirecionando(true);
    logout();
    navigate('/', { replace: true });
  };

  const excluirConta = () => {
    try {
      deleteAccount();
      setRedirecionando(true);
      navigate('/', { replace: true, state: { accountDeleted: true } });
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível excluir a conta.');
    }
  };

  if (redirecionando) return null;
  if (!user) return <Navigate to="/" replace />;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f8f7f2] px-4 pb-16 pt-28">
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-card sm:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Sua conta</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0f3d2a]">Olá, {user?.nome}.</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Você está conectado como {user?.tipoCadastro === 'empresa' ? 'empresa' : 'candidato'} ({user?.email}).
          Escolha se deseja encerrar sua sessão ou apagar permanentemente seu cadastro deste navegador.
        </p>

        {mensagemErro && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{mensagemErro}</p>}

        {!confirmarExclusao ? (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={sair} className="flex-1 rounded-lg bg-[#0d5c3a] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a2f]">
              Sair da conta
            </button>
            <button type="button" onClick={() => setConfirmarExclusao(true)} className="flex-1 rounded-lg border border-red-300 px-5 py-3.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50">
              Excluir minha conta
            </button>
          </div>
        ) : (
          <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-900">Confirmar exclusão?</h2>
            <p className="mt-2 text-sm leading-relaxed text-red-800">
              Esta ação apaga o cadastro e encerra a sessão neste navegador. Não será possível desfazê-la.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={excluirConta} className="flex-1 rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800">
                Sim, excluir conta
              </button>
              <button type="button" onClick={() => setConfirmarExclusao(false)} className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Logoff;
