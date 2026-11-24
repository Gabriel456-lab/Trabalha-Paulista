import React, { useState } from 'react';
import hero from '../img/hero.svg';
import cidade from '../img/cidade.svg';
import cta from '../img/cta.svg';
import logo from '../img/logo.svg';

const IMG = { hero, cidade, cta };

const C = {
  verde: 'bg-[#0d5c3a] hover:bg-[#0a4a2f] text-white',
  texto: 'text-[#0d5c3a]',
};

const PATHS = {
  arrow: 'M7 17L17 7M7 7h10v10',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  check: 'M22 11.1V12a10 10 0 11-5.9-9.1M22 4L12 14l-3-3',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  down: 'M6 9l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  bookmark: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
  user: 'M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z',
  heart: 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z',
  store: 'M3 9l1-5h16l1 5M4 9v11h16V9M9 20v-6h6v6',
  briefcase: 'M3 7h18v13H3zM8 7V4h8v3',
  box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  utensils: 'M5 3v7a2 2 0 004 0V3M7 10v11M17 3c-2 2-3 5-3 8h3v10',
  file: 'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5',
  chat: 'M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6A8 8 0 1121 12z',
  sprout: 'M12 21v-8M12 13c0-4 3-6 7-6 0 4-3 6-7 6zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z',
};

function Icon({ name, className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

function Foto({ src, alt = '', className = '' }) {
  if (src) return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  return <div className={`bg-gradient-to-br from-[#d9a566] via-[#b9784a] to-[#6b4226] ${className}`} />;
}

const Eyebrow = ({ children, className = 'text-[#0d5c3a]' }) => (
  <p className={`text-[11px] font-medium uppercase tracking-wide ${className}`}>{children}</p>
);

const LinkSeta = ({ children, href = '#', className = '' }) => (
  <a href={href} className={`inline-flex items-center gap-1 text-xs font-semibold text-[#0d5c3a] hover:underline ${className}`}>
    {children} <Icon name="arrow" className="w-3 h-3" />
  </a>
);

const Wrap = ({ children, className = '' }) => (
  <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>
);

/* ---------- dados ---------- */
const beneficios = [
  { icon: 'map', t: 'Oportunidades locais', d: 'Paulista e seus bairros' },
  { icon: 'user', t: 'Seu perfil, sua história', d: 'Mais que um currículo' },
  { icon: 'heart', t: 'Conexões que aproximam', d: 'Pessoas e negócios da cidade' },
];

const areas = [
  { icon: 'store', t: 'Comércio e vendas', d: 'Atendimento, caixa e vendas' },
  { icon: 'briefcase', t: 'Administrativo', d: 'Escritório e organização' },
  { icon: 'box', t: 'Logística e indústria', d: 'Operação e distribuição' },
  { icon: 'utensils', t: 'Serviços e alimentação', d: 'Cuidado e hospitalidade' },
];

const filtros = ['Todas as vagas', 'Sem experiência', 'Jovem aprendiz', 'Estágio', 'Perto de mim'];

const vagas = [
  { sigla: 'EC', empresa: 'Escritório Conecta', quando: 'Há 2 horas', cargo: 'Auxiliar administrativo', local: 'Centro, Paulista', tags: ['CLT', 'Presencial'], salario: 'R$ 1.800 a R$ 2.100' },
  { sigla: 'MB', empresa: 'Mercado do Bairro', quando: 'Há 4 horas', cargo: 'Operador de caixa', local: 'Janga, Paulista', tags: ['CLT', 'Presencial'], salario: 'R$ 1.650 + benefícios' },
  { sigla: 'RN', empresa: 'Rota Norte Distribuidora', quando: 'Hoje', cargo: 'Assistente de logística', local: 'Paratibe, Paulista', tags: ['CLT', 'Presencial'], salario: 'R$ 2.000 a R$ 2.400' },
  { sigla: 'BD', empresa: 'Padaria Bom Dia', quando: 'Hoje', cargo: 'Atendente de padaria', local: 'Maranguape I, Paulista', tags: ['CLT', 'Presencial'], salario: 'R$ 1.650 + benefícios' },
  { sigla: 'LC', empresa: 'Loja Caminhos', quando: 'Ontem', cargo: 'Jovem aprendiz · Comércio', local: 'Centro, Paulista', tags: ['Aprendiz', 'Presencial'], salario: 'R$ 750 a R$ 950' },
  { sigla: 'OH', empresa: 'Oficina Horizonte', quando: 'Ontem', cargo: 'Técnico em manutenção', local: 'Jardim Paulista, Paulista', tags: ['CLT', 'Presencial'], salario: 'R$ 2.500 a R$ 3.000' },
];

const passos = [
  { n: '01', t: 'Conte a sua história', d: 'Crie sua conta e preencha seu perfil com suas experiências, habilidades e interesses.' },
  { n: '02', t: 'Encontre o seu caminho', d: 'Busque por cargo, área ou bairro. Confira os requisitos e escolha as vagas que fazem sentido.' },
  { n: '03', t: 'Dê o próximo passo', d: 'Candidate-se e acompanhe o andamento das suas candidaturas na sua área pessoal.' },
];

const apoios = [
  { icon: 'file', tag: 'Currículo', t: 'Seu currículo pode contar mais.', d: 'Saiba como apresentar suas experiências e destacar o que você faz bem.', l: 'Preparar meu currículo' },
  { icon: 'chat', tag: 'Entrevista', t: 'Mais confiança na conversa.', d: 'Organize suas ideias e conheça dicas para se preparar para uma entrevista.', l: 'Ver dicas de entrevista' },
  { icon: 'sprout', tag: 'Primeira oportunidade', t: 'Todo começo tem valor.', d: 'Ainda não tem experiência? Descubra como valorizar seus cursos e habilidades.', l: 'Começar minha jornada' },
];

const faq = [
  { p: 'Preciso pagar para me candidatar?', r: 'Não. Criar sua conta, montar seu perfil e se candidatar às oportunidades é gratuito para candidatos. Nenhuma vaga deve exigir pagamento para participar de uma seleção.' },
  { p: 'Posso me cadastrar sem experiência?', r: 'Sim. Você pode destacar cursos, habilidades e interesses no seu perfil e buscar vagas para quem está começando.' },
  { p: 'Como acompanho minhas candidaturas?', r: 'Na sua área pessoal, você vê todas as candidaturas e o andamento de cada uma.' },
  { p: 'Como uma empresa divulga uma vaga?', r: 'A empresa cria um cadastro, preenche os dados da oportunidade e publica a vaga na plataforma.' },
];

/* ---------- seções ---------- */
function Hero() {
  return (
    <section className="bg-[#f7f5ef]">
      <Wrap className="pt-12 pb-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-[#0d5c3a]">
              <Icon name="pin" className="w-3.5 h-3.5" /> Gente de Paulista. Talento daqui.
            </p>
            <h1 className="mt-5 text-4xl md:text-5xl font-medium leading-[1.1] text-[#0f3d2a]">
              Seu talento tem lugar por aqui.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">
              Conectamos quem quer trabalhar a quem precisa contratar. Encontre o seu próximo emprego em Paulista e dê um novo passo na sua história.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a href="/vagas" className={`${C.verde} inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold transition-colors`}>
                Encontrar oportunidades <Icon name="arrow" className="w-3.5 h-3.5" />
              </a>
              <a href="/empresa" className="inline-flex items-center gap-1 text-xs font-semibold text-[#6b3a22] hover:underline">
                Quero contratar <Icon name="arrowR" className="w-3 h-3" />
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-gray-600">
              <Icon name="check" className="w-3.5 h-3.5 text-[#0d5c3a]" /> Gratuito para você. Perto da sua realidade.
            </p>
          </div>

          <div className="relative md:ml-auto w-full md:max-w-md">
            <Foto src={IMG.hero} alt="Trabalhadora em padaria" className="h-[26rem] w-full rounded-[2rem] rounded-bl-[4rem]" />
            <div className="absolute bottom-6 left-6 right-16 flex items-center gap-3 rounded-xl bg-white p-3 shadow">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f0e4] text-[#0d5c3a]"><Icon name="sprout" /></span>
              <div>
                <p className="text-xs font-semibold text-gray-900">O futuro também é daqui.</p>
                <p className="text-[11px] text-gray-500">Novas conexões, novos caminhos.</p>
              </div>
            </div>
          </div>
        </div>

        <form className="mt-8 flex flex-col md:flex-row items-stretch gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <label className="flex flex-1 items-center gap-3 px-2 md:border-r md:border-gray-200">
            <Icon name="search" className="w-4 h-4 text-gray-500" />
            <span className="flex-1">
              <span className="block text-[11px] font-semibold text-gray-900">O que você procura?</span>
              <input className="w-full text-xs placeholder-gray-500 outline-none" placeholder="Cargo, empresa ou palavra-chave" />
            </span>
          </label>
          <label className="flex flex-1 items-center gap-3 px-2">
            <Icon name="pin" className="w-4 h-4 text-gray-500" />
            <span className="flex-1">
              <span className="block text-[11px] font-semibold text-gray-900">Onde?</span>
              <select className="w-full appearance-none bg-transparent text-xs text-gray-500 outline-none">
                <option>Todos os bairros de Paulista</option>
                <option>Centro</option>
                <option>Janga</option>
                <option>Paratibe</option>
                <option>Maranguape I</option>
              </select>
            </span>
            <Icon name="down" className="w-4 h-4 text-gray-500" />
          </label>
          <button type="submit" className={`${C.verde} rounded-md px-6 py-3 text-xs font-semibold transition-colors`}>Buscar vagas</button>
        </form>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {beneficios.map((b, i) => (
            <li key={b.t} className={`flex items-center gap-3 ${i === 1 ? 'sm:justify-center' : i === 2 ? 'sm:justify-end' : ''}`}>
              <span className="text-[#0d5c3a]"><Icon name={b.icon} className="w-5 h-5" /></span>
              <span>
                <span className="block text-xs font-semibold text-gray-900">{b.t}</span>
                <span className="block text-[11px] text-gray-500">{b.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

function Areas() {
  return (
    <section className="bg-[#e9f0e4] py-12">
      <Wrap>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-[#0f3d2a]">Qual é o seu próximo caminho?</h2>
          <LinkSeta href="/vagas" className="hidden sm:inline-flex">Explorar todas as áreas</LinkSeta>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <a key={a.t} href="/vagas" className="relative rounded-xl bg-white p-5 transition-shadow hover:shadow">
              <Icon name="arrow" className="absolute right-5 top-5 w-3.5 h-3.5 text-[#0d5c3a]" />
              <span className="text-[#0d5c3a]"><Icon name={a.icon} className="w-5 h-5" /></span>
              <h3 className="mt-5 text-sm font-semibold text-gray-900">{a.t}</h3>
              <p className="mt-1 text-[11px] text-gray-500">{a.d}</p>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Vagas() {
  const [ativo, setAtivo] = useState(0);
  return (
    <section id="vagas" className="bg-[#f7f5ef] py-14">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-gray-600">Oportunidades por perto</Eyebrow>
            <h2 className="mt-2 text-3xl font-medium text-[#0f3d2a]">Um novo começo pode estar aqui.</h2>
            <p className="mt-3 text-sm text-gray-600">Explore vagas em diferentes áreas e encontre a que combina com você.</p>
          </div>
          <a href="/vagas" className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0d5c3a] hover:bg-gray-50">
            Ver todas as vagas <Icon name="arrow" className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filtros.map((f, i) => (
            <button
              key={f}
              onClick={() => setAtivo(i)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-medium transition-colors ${
                ativo === i ? 'border-[#0d5c3a] bg-[#0d5c3a] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#0d5c3a]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vagas.map((v) => (
            <article key={v.cargo} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f0e4] text-[11px] font-bold text-[#0d5c3a]">{v.sigla}</span>
                  <div>
                    <p className="text-[11px] text-gray-700">{v.empresa}</p>
                    <p className="text-[10px] text-gray-400">{v.quando}</p>
                  </div>
                </div>
                <button aria-label="Salvar vaga" className="text-gray-400 hover:text-[#0d5c3a]"><Icon name="bookmark" /></button>
              </div>
              <h3 className="mt-4 text-lg font-medium text-[#0f3d2a]">{v.cargo}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500"><Icon name="pin" className="w-3 h-3" /> {v.local}</p>
              <div className="mt-3 flex gap-2">
                {v.tags.map((t) => (
                  <span key={t} className={`rounded px-2 py-0.5 text-[10px] font-semibold ${t === 'Aprendiz' ? 'bg-[#f3dccb] text-[#6b3a22]' : 'bg-[#e9f0e4] text-[#0d5c3a]'}`}>{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[11px] font-semibold text-gray-900">{v.salario}</span>
                <Icon name="arrow" className="w-3.5 h-3.5 text-[#0d5c3a]" />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-gray-500">
          Vagas e empresas ilustrativas para apresentar a plataforma. Os detalhes de cada oportunidade devem ser conferidos antes da candidatura.
        </p>
      </Wrap>
    </section>
  );
}

function Cidade() {
  return (
    <section className="bg-[#efe5d8] py-14">
      <Wrap className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <Foto src={IMG.cidade} alt="Duas pessoas conversando em um café" className="h-72 w-full rounded-xl md:h-80" />
        <div>
          <Eyebrow className="text-[#6b3a22]">Da nossa cidade, para a nossa gente</Eyebrow>
          <h2 className="mt-4 text-3xl font-medium leading-tight text-[#6b3a22]">Quando o talento fica perto, a cidade vai mais longe.</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6b3a22]/80">
            Do comércio do Centro aos serviços no Janga, de Paratibe a Maranguape: Paulista é feita por gente que faz acontecer. Nosso papel é aproximar essas pessoas das oportunidades.
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs text-[#6b3a22]">
            <Icon name="pin" className="w-3.5 h-3.5" /> Uma plataforma com o olhar voltado para Paulista–PE.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

function Passos() {
  return (
    <section className="bg-white py-14">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-gray-600">Simples, do seu jeito</Eyebrow>
            <h2 className="mt-2 text-3xl font-medium text-[#0f3d2a]">Três passos. Muitas possibilidades.</h2>
          </div>
          <a href="/cadastro" className={`${C.verde} inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold transition-colors`}>
            Criar meu perfil gratuito <Icon name="arrow" className="w-3.5 h-3.5" />
          </a>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {passos.map((p) => (
            <li key={p.n}>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f0e4] text-xs font-semibold text-[#0d5c3a]">{p.n}</span>
                <span className="hidden h-px flex-1 bg-gray-200 md:block" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-[#0f3d2a]">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.d}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

function Apoio() {
  return (
    <section className="bg-[#f7f5ef] py-14">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-3xl font-medium text-[#0f3d2a]">Um apoio para ir além.</h2>
          <p className="text-xs text-gray-500">Pequenos passos que fazem diferença na sua busca.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {apoios.map((a) => (
            <article key={a.t} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-[#0d5c3a]">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e9f0e4]"><Icon name={a.icon} className="w-3.5 h-3.5" /></span>
                <span className="text-[10px] font-semibold uppercase tracking-wide">{a.tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-medium text-[#0f3d2a]">{a.t}</h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">{a.d}</p>
              <LinkSeta className="mt-4">{a.l}</LinkSeta>
            </article>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-[#f7f5ef] pb-14">
      <Wrap>
        <div className="grid overflow-hidden rounded-2xl bg-[#12432c] md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-10">
            <Eyebrow className="text-white/70">Para quem faz a economia girar</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-white">O próximo talento do seu negócio pode ser seu vizinho.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Divulgue suas oportunidades e aproxime sua empresa de profissionais de Paulista. Valorize quem já faz parte da nossa cidade.
            </p>
            <a href="/empresa" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-semibold text-[#0d5c3a] hover:bg-[#e9f0e4]">
              Quero divulgar uma vaga <Icon name="arrow" className="w-3.5 h-3.5" />
            </a>
          </div>
          <Foto src={IMG.cta} alt="Comerciante em sua loja" className="h-60 w-full md:h-full" />
        </div>
      </Wrap>
    </section>
  );
}

function Duvidas() {
  const [aberto, setAberto] = useState(0);
  return (
    <section className="bg-white py-14">
      <Wrap className="grid gap-10 md:grid-cols-[1fr_1.8fr]">
        <div>
          <Eyebrow className="text-gray-600">Pode perguntar</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium leading-tight text-[#0f3d2a]">Vamos tirar suas dúvidas?</h2>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-gray-500">O essencial para começar sua jornada com o Trabalha Paulista.</p>
          <LinkSeta href="/ajuda" className="mt-5">Acessar a central de ajuda</LinkSeta>
        </div>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faq.map((f, i) => (
            <div key={f.p} className="py-5">
              <button onClick={() => setAberto(aberto === i ? -1 : i)} className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-900" aria-expanded={aberto === i}>
                {f.p}
                <Icon name={aberto === i ? 'minus' : 'plus'} className="w-3.5 h-3.5 text-[#0d5c3a]" />
              </button>
              {aberto === i && <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-500">{f.r}</p>}
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Rodape() {
  const cols = [
    { t: 'Para você', l: ['Buscar vagas', 'Criar currículo', 'Minhas candidaturas'] },
    { t: 'Para empresas', l: ['Divulgar uma vaga', 'Encontrar profissionais', 'Como funciona'] },
    { t: 'Precisa de ajuda?', l: ['Central de ajuda', 'Termos de uso', 'Privacidade'] },
  ];
  return (
    <footer className="border-t border-gray-200 bg-[#f7f5ef]">
      <Wrap className="py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <img src={logo} alt="Trabalha Paulista" className="h-14 w-auto" />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-gray-500">
              Talento daqui. Oportunidades por perto. Uma conexão entre quem quer trabalhar e quem precisa contratar em Paulista–PE.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <h4 className="text-xs font-semibold text-gray-900">{c.t}</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-500">
                {c.l.map((x) => (<li key={x}><a href="#" className="hover:text-[#0d5c3a]">{x}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-gray-200 pt-4 text-[11px] text-gray-500">
          <span>© 2026 Trabalha Paulista. Feito para conectar pessoas.</span>
          <span>Paulista, Pernambuco · Plataforma independente</span>
        </div>
      </Wrap>
    </footer>
  );
}

function Home() {
  return (
    <div className="font-sans text-gray-900">
      <main>
        <Hero />
        <Areas />
        <Vagas />
        <Cidade />
        <Passos />
        <Apoio />
        <CTA />
        <Duvidas />
      </main>
      <Rodape />
    </div>
  );
}

export default Home;
