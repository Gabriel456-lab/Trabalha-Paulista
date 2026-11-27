import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness, MapPin, Search, UsersRound } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import vagas from '../data/vagas';

function AreaCandidato() {
  const [params, setParams] = useSearchParams();
  const [detalheAberto, setDetalheAberto] = useState('');
  const consulta = params.get('q') || '';
  const bairro = params.get('bairro') || '';
  const resultados = vagas.filter((vaga) => {
    const texto = `${vaga.titulo} ${vaga.empresa} ${vaga.area}`.toLowerCase();
    return texto.includes(consulta.toLowerCase()) && (!bairro || vaga.bairro === bairro);
  });

  const atualizarBusca = (evento) => {
    evento.preventDefault();
    const form = new FormData(evento.currentTarget);
    const novaConsulta = new URLSearchParams();
    const q = String(form.get('q') || '').trim();
    const local = String(form.get('bairro') || '');
    if (q) novaConsulta.set('q', q);
    if (local) novaConsulta.set('bairro', local);
    setParams(novaConsulta);
  };

  return (
    <>
      <header className="bg-[#103d2b] px-4 pb-10 pt-28 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Oportunidades em Paulista–PE</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Encontre uma vaga perto de você.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
            Explore oportunidades locais e encontre um próximo passo que combine com sua história.
          </p>
          <form key={params.toString()} onSubmit={atualizarBusca} className="mt-7 grid gap-3 rounded-xl bg-white p-3 sm:grid-cols-[1fr_220px_auto]">
            <label className="flex items-center gap-3 px-2">
              <Search size={18} className="shrink-0 text-gray-500" aria-hidden="true" />
              <span className="sr-only">Cargo, empresa ou palavra-chave</span>
              <input name="q" defaultValue={consulta} placeholder="Cargo, empresa ou palavra-chave" className="w-full py-2 text-sm text-gray-900 outline-none" />
            </label>
            <label className="flex items-center gap-2 border-gray-200 px-2 sm:border-l">
              <MapPin size={18} className="shrink-0 text-gray-500" aria-hidden="true" />
              <span className="sr-only">Bairro</span>
              <select name="bairro" defaultValue={bairro} className="w-full bg-white py-2 text-sm text-gray-700 outline-none">
                <option value="">Todos os bairros</option>
                {[...new Set(vagas.map((vaga) => vaga.bairro))].map((nomeBairro) => (
                  <option value={nomeBairro} key={nomeBairro}>{nomeBairro}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="rounded-lg bg-[#0d5c3a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0a4a2f]">
              Buscar
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b3a22]">Vagas em destaque</p>
            <h2 className="mt-2 text-2xl font-bold text-[#123d2c]">{resultados.length} oportunidades para explorar</h2>
          </div>
          <p className="text-xs text-gray-500">Conteúdo demonstrativo para a plataforma</p>
        </div>
        {resultados.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resultados.map((vaga) => (
              <article key={vaga.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf0e6] text-xs font-bold text-[#075e36]">{vaga.iniciais}</span>
                    <div>
                      <p className="text-xs text-gray-500">{vaga.empresa}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500"><MapPin size={12} /> {vaga.bairro}, Paulista</p>
                    </div>
                  </div>
                  <BriefcaseBusiness size={17} className="text-[#075e36]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#123d2c]">{vaga.titulo}</h3>
                <p className="mt-2 text-xs text-gray-600">{vaga.modalidade} · {vaga.experiencia}</p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-gray-700">{vaga.salario}</span>
                  <button
                    type="button"
                    onClick={() => setDetalheAberto(detalheAberto === vaga.id ? '' : vaga.id)}
                    aria-expanded={detalheAberto === vaga.id}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#075e36] hover:underline"
                  >
                    {detalheAberto === vaga.id ? 'Fechar' : 'Ver detalhes'} <ArrowUpRight size={13} />
                  </button>
                </div>
                {detalheAberto === vaga.id && (
                  <p className="mt-4 rounded-lg bg-[#f8f7f2] p-3 text-sm leading-relaxed text-gray-600">
                    Oportunidade na área de {vaga.area.toLowerCase()}, em {vaga.bairro}. Para se candidatar, entre em contato diretamente com a empresa.
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p role="status" className="rounded-xl bg-white p-8 text-center text-sm text-gray-600">
            Nenhuma vaga encontrada com esses filtros. Tente outra palavra ou bairro.
          </p>
        )}
      </section>
    </>
  );
}

function AreaEmpresa({ user }) {
  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-2xl bg-[#103d2b] text-white">
          <div className="grid items-center lg:grid-cols-2">
            <div className="px-6 py-10 sm:px-10 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Área para empresas</p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">Vamos encontrar o talento certo para {user.nome}.</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                Este painel demonstra como sua empresa poderá divulgar oportunidades e se conectar com profissionais de Paulista.
              </p>
              <Link to="/#para-empresas" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0d5c3a] hover:bg-gray-100">
                Conhecer a plataforma <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:p-10">
              <div className="rounded-xl bg-white/10 p-5">
                <BriefcaseBusiness size={22} className="text-white" aria-hidden="true" />
                <h2 className="mt-4 font-semibold">Divulgue oportunidades</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">Apresente vagas para pessoas que vivem e buscam trabalho na região.</p>
              </div>
              <div className="rounded-xl bg-white/10 p-5">
                <UsersRound size={22} className="text-white" aria-hidden="true" />
                <h2 className="mt-4 font-semibold">Encontre profissionais</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">Aproxime seu negócio de talentos locais e fortaleça a economia da cidade.</p>
              </div>
            </div>
          </div>
        </section>
        <p className="mt-6 text-center text-xs text-gray-500">
          Área demonstrativa: as vagas publicadas e as candidaturas ainda não são enviadas a um servidor.
        </p>
      </div>
    </main>
  );
}

export default function AreaUsuario() {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/empresa') return <AreaEmpresa user={user} />;
  return (
    <main className="min-h-screen bg-[#f8f7f2]">
      <AreaCandidato />
    </main>
  );
}
