import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Package,
  Store,
  Utensils,
} from 'lucide-react';
import pequenoNegocio from '../img/Pequeno-negocio-local.png';
import vidaNoBairro from '../img/Vida-e-trabalho-no-bairro.png';
import vagas from '../data/vagas';
import { useAuth } from '../auth/AuthContext';

const areas = [
  { icon: Store, titulo: 'Comércio e vendas', detalhe: 'Atendimento, caixa e vendas', query: 'comércio' },
  { icon: BriefcaseBusiness, titulo: 'Administrativo', detalhe: 'Escritório e organização', query: 'administrativo' },
  { icon: Package, titulo: 'Logística e indústria', detalhe: 'Operação e distribuição', query: 'logística' },
  { icon: Utensils, titulo: 'Serviços e alimentação', detalhe: 'Cuidado e hospitalidade', query: 'atendente' },
];

const filtros = ['Todas as vagas', 'Sem experiência', 'Jovem aprendiz', 'Estágio'];

function HomeSections() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filtro, setFiltro] = useState('Todas as vagas');
  const [avisoEmpresa, setAvisoEmpresa] = useState('');
  const vagasFiltradas = vagas.filter((vaga) => (
    filtro === 'Todas as vagas'
    || (filtro === 'Sem experiência' && vaga.experiencia === 'Sem experiência')
    || (filtro === 'Jovem aprendiz' && vaga.experiencia === 'Jovem aprendiz')
    || (filtro === 'Estágio' && vaga.experiencia === 'Estágio')
  ));

  const abrirVagas = (query = '') => {
    const search = query ? `?q=${encodeURIComponent(query)}` : '';
    if (user?.tipoCadastro === 'empresa') {
      navigate('/empresa');
    } else if (user) {
      navigate(`/vagas${search}`);
    } else {
      navigate('/login', { state: { from: { pathname: '/vagas', search } } });
    }
  };

  const abrirAreaEmpresa = () => {
    if (user?.tipoCadastro === 'empresa') {
      navigate('/empresa');
    } else if (user) {
      setAvisoEmpresa('Sua conta atual é de candidato. Para contratar, crie uma conta de empresa com outro e-mail.');
    } else {
      navigate('/cadastro', { state: { tipoCadastro: 'empresa' } });
    }
  };

  return (
    <>
      <section className="bg-[#eaf0e6] px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#123d2c]">Qual é o seu próximo caminho?</h2>
            <button type="button" onClick={() => abrirVagas()} className="inline-flex items-center gap-1 text-xs font-semibold text-[#075e36] hover:underline">
              Explorar todas as áreas <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map(({ icon: Icon, titulo, detalhe, query }) => (
              <button
                type="button"
                key={titulo}
                onClick={() => abrirVagas(query)}
                className="group rounded-xl bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex items-center justify-between text-[#075e36]">
                  <Icon size={20} aria-hidden="true" />
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-sm font-semibold text-[#202d25]">{titulo}</span>
                <span className="mt-1 block text-xs text-[#677068]">{detalhe}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="vagas" className="scroll-mt-24 bg-[#f8f7f2] px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Oportunidades por perto</p>
              <h2 className="mt-2 text-3xl font-bold text-[#123d2c]">Um novo começo pode estar aqui.</h2>
              <p className="mt-2 text-sm text-[#677068]">Explore vagas em diferentes áreas e encontre o que combina com você.</p>
            </div>
            <button type="button" onClick={() => abrirVagas()} className="inline-flex items-center gap-2 rounded-lg border border-[#dee3da] bg-white px-4 py-3 text-xs font-semibold text-[#075e36] hover:bg-[#f4f7f2]">
              Ver todas as vagas <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {filtros.map((opcao) => (
              <button
                type="button"
                key={opcao}
                onClick={() => setFiltro(opcao)}
                aria-pressed={filtro === opcao}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filtro === opcao ? 'bg-[#075e36] text-white' : 'border border-[#dee3da] bg-white text-[#677068] hover:border-[#075e36]'}`}
              >
                {opcao}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vagasFiltradas.slice(0, 6).map((vaga) => (
              <button
                type="button"
                key={vaga.id}
                onClick={() => abrirVagas(vaga.titulo)}
                className="group rounded-xl border border-[#dee3da] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf0e6] text-[11px] font-bold text-[#075e36]">{vaga.iniciais}</span>
                    <span>
                      <span className="block text-xs font-medium text-[#677068]">{vaga.empresa}</span>
                      <span className="mt-1 flex items-center gap-1 text-[11px] text-[#677068]"><MapPin size={11} /> {vaga.bairro}, Paulista</span>
                    </span>
                  </span>
                  <ArrowUpRight size={15} className="text-[#075e36]" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-base font-semibold text-[#202d25]">{vaga.titulo}</span>
                <span className="mt-2 block text-xs text-[#677068]">{vaga.modalidade}</span>
                <span className="mt-4 flex items-center justify-between border-t border-[#eef0ea] pt-4 text-[11px]">
                  <span className="font-semibold text-[#202d25]">{vaga.salario}</span>
                  <span className="text-[#677068]">{vaga.experiencia}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-[#677068]">
            Vagas demonstrativas para apresentar a plataforma. Os detalhes e candidaturas ainda não são enviados a empresas.
          </p>
        </div>
      </section>

      <section className="bg-[#f0e7d9] px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <img src={vidaNoBairro} alt="Comerciantes conversando em um negócio local" className="h-64 w-full rounded-2xl object-cover md:h-80" />
          <div className="py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Da nossa cidade, para a nossa gente</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#57321e]">Quando o talento fica perto, a cidade vai mais longe.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#674d3c]">
              Do comércio do Centro aos serviços no Janga, de Paratibe a Maranguape: Paulista é feita por gente que faz acontecer. Nosso papel é aproximar essas pessoas das oportunidades.
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs font-medium text-[#674d3c]">
              <MapPin size={15} /> Uma plataforma com o olhar voltado para Paulista–PE.
            </p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-white px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Simples, do seu jeito</p>
              <h2 className="mt-2 text-3xl font-bold text-[#123d2c]">Três passos. Muitas possibilidades.</h2>
            </div>
            <Link to="/cadastro" className="inline-flex items-center gap-2 rounded-lg bg-[#075e36] px-5 py-3 text-xs font-semibold text-white hover:bg-[#064c2c]">
              Criar meu perfil gratuito <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ['01', 'Conte a sua história', 'Crie sua conta e preencha seu perfil com suas experiências, habilidades e interesses.'],
              ['02', 'Encontre o seu caminho', 'Busque por cargo, área ou bairro. Confira os requisitos e escolha as vagas que fazem sentido.'],
              ['03', 'Dê o próximo passo', 'Candidate-se e acompanhe o andamento das suas candidaturas na sua área pessoal.'],
            ].map(([numero, titulo, texto]) => (
              <article key={numero} className="border-t border-[#dee3da] pt-5">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#eaf0e6] text-xs font-bold text-[#075e36]">{numero}</span>
                <h3 className="mt-4 text-base font-semibold text-[#202d25]">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#677068]">{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f2] px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#123d2c]">Um apoio para ir além.</h2>
            <p className="text-xs text-[#677068]">Pequenos passos que fazem diferença na sua busca.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Currículo', 'Seu currículo pode contar mais.', 'Saiba como apresentar suas experiências e destacar o que você faz bem.', 'Preparar meu currículo'],
              ['Entrevista', 'Mais confiança na conversa.', 'Organize suas ideias e conheça dicas para se preparar para uma entrevista.', 'Ver dicas de entrevista'],
              ['Primeira oportunidade', 'Todo começo tem valor.', 'Ainda não tem experiência? Descubra como valorizar seus cursos e habilidades.', 'Começar minha jornada'],
            ].map(([categoria, titulo, texto, acao]) => (
              <article key={categoria} className="rounded-xl border border-[#dee3da] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#075e36]">{categoria}</p>
                <h3 className="mt-3 font-semibold text-[#202d25]">{titulo}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#677068]">{texto}</p>
                <a href="#ajuda" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#075e36] hover:underline">
                  {acao} <ArrowUpRight size={13} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="para-empresas" className="scroll-mt-24 px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-[#103d2b] text-white md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-7 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Para quem faz a economia girar</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">O próximo talento do seu negócio pode ser seu vizinho.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Divulgue suas oportunidades e aproxime sua empresa de profissionais de Paulista. Valorize quem já faz parte da nossa cidade.
            </p>
            <button type="button" onClick={abrirAreaEmpresa} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-[#075e36] hover:bg-gray-100">
              Quero divulgar uma vaga <ArrowUpRight size={14} />
            </button>
            {avisoEmpresa && <p role="status" className="mt-3 text-xs text-white/90">{avisoEmpresa}</p>}
          </div>
          <img src={pequenoNegocio} alt="Profissional trabalhando em uma oficina local" className="h-64 w-full object-cover md:h-full" />
        </div>
      </section>

      <section id="ajuda" className="scroll-mt-24 bg-[#f8f7f2] px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b3a22]">Pode perguntar</p>
            <h2 className="mt-3 text-3xl font-bold text-[#123d2c]">Vamos tirar suas dúvidas?</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#677068]">O essencial para começar sua jornada com o Trabalha Paulista.</p>
            <a href="mailto:ajuda@trabalhapaulista.com.br" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#075e36] hover:underline">
              Acessar a central de ajuda <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="divide-y divide-[#dee3da] border-y border-[#dee3da]">
            {[
              ['Preciso pagar para me candidatar?', 'Não. Criar sua conta, montar seu perfil e se candidatar às oportunidades é gratuito para candidatos. Nenhuma vaga deve exigir pagamento para participar do processo.'],
              ['Posso me cadastrar sem experiência?', 'Sim. Você pode criar seu perfil e buscar vagas de entrada, estágio e jovem aprendiz, além de destacar cursos e habilidades.'],
              ['Como acompanho minhas candidaturas?', 'Entre na sua conta para acessar sua área pessoal. Nesta versão demonstrativa, o acompanhamento ainda não está conectado às empresas.'],
              ['Como uma empresa divulga uma vaga?', 'Crie uma conta selecionando “Empresa” e acesse a área de contratação para conhecer a plataforma.'],
            ].map(([pergunta, resposta]) => (
              <details key={pergunta} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#202d25]">
                  {pergunta}
                  <ChevronDown size={16} className="shrink-0 text-[#075e36] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#677068]">{resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dee3da] bg-white px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="inline-block">
                <span className="text-lg font-extrabold text-[#075e36]">TRABALHA PAULISTA</span>
              </Link>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#677068]">Talento daqui. Oportunidades por perto. Uma conexão entre quem quer trabalhar e quem precisa contratar em Paulista–PE.</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#202d25]">Para você</h3>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[#677068]">
                <Link to="/#vagas" className="hover:text-[#075e36]">Buscar vagas</Link>
                <Link to="/cadastro" className="hover:text-[#075e36]">Criar currículo</Link>
                <Link to="/vagas" className="hover:text-[#075e36]">Minhas candidaturas</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#202d25]">Para empresas</h3>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[#677068]">
                <Link to="/cadastro" state={{ tipoCadastro: 'empresa' }} className="hover:text-[#075e36]">Divulgar uma vaga</Link>
                <Link to="/empresa" className="hover:text-[#075e36]">Encontrar profissionais</Link>
                <Link to="/#como-funciona" className="hover:text-[#075e36]">Como funciona</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#202d25]">Precisa de ajuda?</h3>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[#677068]">
                <Link to="/#ajuda" className="hover:text-[#075e36]">Central de ajuda</Link>
                <a href="/termos" className="hover:text-[#075e36]">Termos de uso</a>
                <a href="/privacidade" className="hover:text-[#075e36]">Privacidade</a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-[#dee3da] pt-5 text-[10px] text-[#677068]">
            <span>© 2026 Trabalha Paulista · Feito para conectar pessoas.</span>
            <span>Paulista, Pernambuco · Plataforma independente</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeSections;
