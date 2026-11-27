# 🚀 Trabalha Paulista – Portal de Empreendedorismo e Capacitação

O **Trabalha Paulista** é uma plataforma web desenvolvida com o objetivo de incentivar o empreendedorismo local, conectar cidadãos a oportunidades de emprego e disponibilizar informações sobre capacitação profissional no município de Paulista – PE.

## 📌 1. Problema

O município de Paulista enfrenta desafios relacionados ao acesso da população a oportunidades de emprego, qualificação profissional e incentivo ao empreendedorismo local. Muitas pessoas encontram dificuldades para localizar vagas de trabalho, conhecer cursos de capacitação e divulgar seus pequenos negócios.

Além disso, a falta de centralização dessas informações dificulta a conexão entre trabalhadores, empreendedores e oportunidades disponíveis na região.

Diante desse cenário, surgiu a proposta de desenvolver uma plataforma digital que reúna essas informações em um único ambiente, facilitando o acesso da população às oportunidades.

## 🎯 2. Objetivo

Desenvolver uma plataforma web que funcione como um canal de conexão entre trabalhadores, empreendedores e oportunidades de capacitação profissional.

O projeto busca fortalecer a economia local, incentivar a criação e o crescimento de pequenos negócios, facilitar o acesso ao mercado de trabalho e contribuir para o desenvolvimento profissional dos cidadãos de Paulista – PE.

## ⚙️ 3. Funcionalidades

O front-end da plataforma apresenta as seguintes funcionalidades:

### 🔐 Página de Login
- Autenticação demonstrativa por e-mail, senha e tipo de conta.
- Sessão mantida no navegador, com opção “Lembrar de mim”.
- Acesso à área de vagas para candidatos e à área de contratação para empresas.

### 📝 Cadastro de Usuário
- Formulário para cadastro de candidato (CPF) ou empresa (CNPJ).
- Contas demonstrativas armazenadas no `localStorage` do navegador.
- Validação de e-mail duplicado e dos campos obrigatórios.

### 🔑 Recuperação de Senha
- Verificação do e-mail cadastrado e alteração local da senha.
- Fluxo demonstrativo local (não realiza envio de e-mail ou código de confirmação).

### 📊 Painel do Usuário
- Área restrita protegida por rota privada (`ProtectedRoute`) para usuários autenticados.
- Apresentação de informações conforme o perfil cadastrado (Candidato ou Empresa).
- Acesso às funcionalidades disponíveis na plataforma.

### 📚 Conteúdos e Oportunidades
- Página inicial com áreas profissionais, vagas demonstrativas (`src/data/vagas.js`), etapas, dicas, perguntas frequentes e seção para empresas.
- Navegação suave entre as seções da página inicial.

### 🚪 Logout
- Opções para encerrar a sessão ativa ou excluir a conta salva no navegador.

> **⚠️ Limitação do protótipo:** A autenticação e os dados ficam armazenados apenas localmente no navegador (`localStorage`) e não oferecem segurança de produção. As senhas ficam salvas em texto simples e a redefinição não valida a posse do e-mail. **Não utilize dados reais.** Para ambientes de produção, este fluxo deve ser substituído por uma API back-end com autenticação segura.

## 🛠️ 4. Tecnologias Utilizadas

### Front-end e Estilização
- **React (`v19.3.1`) & React DOM:** Construção da interface reativa, gerenciamento de estado via Context API (`AuthContext`) e componentização.
- **React Router DOM (`v7.18.5`):** Gerenciamento de rotas públicas e rotas protegidas da aplicação.
- **Tailwind CSS (`v3.4.19`), PostCSS (`v8.5.32`) e Autoprefixer (`v10.6.2`):** Framework CSS utilitário responsável pela estilização responsiva e design system configurado em `tailwind.config.js`.
- **Lucide React (`v1.70.0`):** Biblioteca de ícones utilizada nos componentes da interface.
- **HTML5 & CSS3:** Estruturação semântica e estilos base da aplicação.

### Ferramentas de Build e Testes
- **Create React App (`react-scripts v5.0.1`):** Empacotamento, servidor de desenvolvimento e build de produção.
- **Testing Library (`@testing-library/react`, `jest-dom`, `user-event`):** Suíte configurada para testes unitários e de componentes.

### Gestão e Organização
- **Trello:** Organização e acompanhamento das tarefas utilizando a metodologia Kanban nas seguintes etapas:
  - Backlog;
  - A Fazer;
  - Em Desenvolvimento;
  - Em Revisão/Testes;
  - Concluído.

## 📁 5. Estrutura do Projeto

```text
Trabalha-Paulista/
├── public/                 # Arquivos estáticos (index.html, manifest.json, SVGs)
├── src/
│   ├── auth/               # Contexto de autenticação (AuthContext.js) e proteção de rotas (ProtectedRoute.js)
│   ├── components/         # Componentes reutilizáveis (Navbar, Hero, SearchBar, Button, HomeSections, etc.)
│   ├── data/               # Base de dados estática/mockada (vagas.js)
│   ├── img/                # Imagens e logotipos da aplicação
│   ├── pages/              # Páginas da aplicação (Home, Login, Cadastro, Esqueci, AreaUsuario, Logoff)
│   ├── App.js              # Configuração principal de rotas e provedores
│   ├── index.css           # Diretivas do Tailwind CSS e estilos globais
│   └── index.js            # Ponto de entrada da aplicação React
├── package.json            # Dependências e scripts do projeto
└── tailwind.config.js      # Configurações customizadas do Tailwind CSS
```

## ▶️ 6. Instruções de Execução

### Pré-requisitos
- **Node.js** (versão 18 LTS ou superior recomendada) e **npm**.
- Navegador web atualizado (Google Chrome, Firefox, Edge ou similar).
- Editor de código (recomendado: Visual Studio Code).

### Passo a passo

**1. Clone o repositório:**

```bash
git clone https://github.com/Gabriel456-lab/Trabalha-Paulista.git
```

**2. Acesse a pasta do projeto:**

```bash
cd Trabalha-Paulista
```

**3. Instale as dependências (incluindo React Router, Lucide Icons e Tailwind CSS):**

```bash
npm install
```

> **Nota de compatibilidade:** Caso ocorra algum conflito de *peer dependencies* durante a instalação devido à combinação entre o `react@^19.3.1` e o `react-scripts@5.0.1`, execute:
>
> ```bash
> npm install --legacy-peer-deps
> ```

**4. Inicie o servidor de desenvolvimento:**

```bash
npm start
```

A aplicação será aberta automaticamente ou ficará disponível em `http://localhost:3000`.

### Outros Scripts Disponíveis

- **Gerar build de produção (pasta `build/`):**

```bash
npm run build
```

- **Executar a suíte de testes:**

```bash
npm test
```

## 👥 7. Integrantes

| Integrante | Matrícula |
|---|---|
| Marcus Vinicius | 01813459 |
| Gabriel Andrade | 01803645 |
| Welson Dias | 01809689 |
| Irlania Felix | 01808910 |
| Micaias Alexandre | 01825976 |

## 📌 8. Considerações Finais

O **Trabalha Paulista** busca utilizar a tecnologia como ferramenta de transformação social e econômica, aproximando cidadãos de oportunidades profissionais e incentivando o empreendedorismo local.

A iniciativa pretende contribuir para o fortalecimento da economia do município de Paulista – PE, facilitando o acesso à informação, à capacitação profissional e ao mercado de trabalho.

*Projeto acadêmico desenvolvido com foco no desenvolvimento econômico, profissional e social do município de Paulista – PE.*