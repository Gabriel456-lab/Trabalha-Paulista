import React, { useEffect, useState } from 'react';

export default function Logoff() {
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirecionamento automático após término do contador
          window.location.href = '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F4EE] flex flex-col justify-between font-sans text-stone-800">
      {/* Cabeçalho */}
      <header className="w-full bg-white border-b border-stone-200 py-3 px-3 md:px-12 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">

        </div>
        <div className="text-xs text-stone-500 font-medium">
          Área de Segurança &bull; Paulista - PE
        </div>
      </header>

      {/* Conteúdo Principal (Card Dividido) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">

          {/* Coluna Esquerda */}
          <div className="md:col-span-5 bg-[#123D2C] text-white p-8 flex flex-col justify-between relative overflow-hidden">

            <div className="relative z-10 my-8">
              <span className="inline-block px-3 py-1 bg-[#075E36] text-[#EAF0E6] text-xs font-medium rounded-full mb-4">
                Sessão Encerrada com Sucesso
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-white">
                Obrigado por usar o Trabalha Paulista.
              </h1>
              <p className="text-[#DEE3DA] text-sm leading-relaxed">
                Sua segurança é nossa prioridade diária. Todos os seus tokens de acesso e dados da sessão ativa foram limpos de forma segura.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#202D25] text-xs text-[#C2D5B9]">
              <span>Plataforma Oficial do Município de Paulista – PE</span>
            </div>
          </div>

          {/* Coluna Direita: Status de Logoff e Ações Rápidas */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">

              <div className="w-12 h-12 bg-emerald-100 text-[#075E36] rounded-full flex items-center justify-center mb-6 text-xl">
                🔒
              </div>

              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                Saída Segura Concluída
              </h2>
              <p className="text-stone-600 text-sm mb-8">
                Você foi desconectado com segurança da sua conta na área restrita. Para retornar e acessar novas oportunidades, faça o login novamente.
              </p>

              <div className="bg-[#F2F4EE] rounded-xl p-4 border border-stone-200 mb-8 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-medium text-stone-500 uppercase">Redirecionamento automático em</span>
                  <span className="text-lg font-bold text-[#075E36]">{countdown} segundos</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#075E36] border-t-transparent animate-spin"></div>
              </div>

              <div className="space-y-3">
                <a
                  href="/login"
                  className="w-full bg-[#075E36] hover:bg-[#123D2C] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  Fazer login novamente
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full bg-white border-t border-stone-200 py-4 px-6 md:px-12 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          &copy; 2026 Trabalha Paulista &bull; Paulista-PE
        </div>
        <div className="flex gap-4">
          <a href="#privacidade" className="hover:text-stone-800 transition-colors">Privacidade</a>
          <a href="#termos" className="hover:text-stone-800 transition-colors">Termos de uso</a>
          <a href="#ajuda" className="hover:text-stone-800 transition-colors">Ajuda</a>
        </div>
      </footer>
    </div>
  );
}