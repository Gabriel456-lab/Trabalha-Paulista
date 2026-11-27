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
- Não envia e-mail ou código de confirmação.

### 📊 Painel do Usuário
- Área restrita para usuários autenticados.
- Apresentação de informações conforme o perfil cadastrado.
- Acesso às funcionalidades disponíveis na plataforma.

### 📚 Conteúdos e Oportunidades
- Página inicial com áreas profissionais, vagas demonstrativas, etapas, dicas, perguntas frequentes e seção para empresas.
- Navegação suave entre as seções da página inicial.

### 🚪 Logout
- Opções para encerrar a sessão ou excluir a conta salva neste navegador.

> **Limitação do protótipo:** a autenticação e os dados ficam somente no navegador e não oferecem segurança de produção. As senhas ficam em texto no `localStorage`; a redefinição não confirma a posse do e-mail. Não use dados reais. Para produção, substitua este fluxo por uma API com armazenamento seguro e recuperação de senha verificada.

## 🛠️ 4. Tecnologias Utilizadas

- **HTML5:** Utilizado para estruturar as páginas e organizar os elementos da aplicação.
- **CSS3:** Responsável pela estilização das interfaces, criação de layouts e adaptação para diferentes dispositivos.
- **JavaScript:** Utilizado para implementar interações, validações de formulários e funcionalidades de navegação.
- **React:** Utilizado para criar a interface de usuário reativa, gerenciando o estado e componentes reutilizáveis de forma eficiente.
- **Trello:** Utilizado para organizar e acompanhar as atividades do projeto por meio da metodologia Kanban.

### 📋 Organização do Projeto (Trello)

As atividades foram organizadas nas seguintes etapas:
- Backlog;
- A Fazer;
- Em Desenvolvimento;
- Em Revisão/Testes;
- Concluído.

## 👥 5. Integrantes

| Integrante | Matrícula |
|---|---|
| Marcus Vinicius | 01813459 |
| Gabriel Andrade | 01803645 |
| Welson Dias | 01809689 |
| Irlania Felix | 01808910 |
| Micaias Alexandre | 01825976 |

## ▶️ 6. Instruções de Execução

### Pré-requisitos.
- Navegador web (Google Chrome, Firefox ou outro).
- Editor de código, preferencialmente Visual Studio Code.
- Node.js e npm.

### Passo a passo.

**1. Clone o repositório:**

```bash
git clone https://github.com/Gabriel456-lab/Trabalha-Paulista.git
```
**2. Abra a pasta no Visual Studio Code e instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## 📌 7. Considerações Finais
O Trabalha Paulista busca utilizar a tecnologia como ferramenta de transformação social e econômica, aproximando cidadãos de oportunidades profissionais e incentivando o empreendedorismo local.

A iniciativa pretende contribuir para o fortalecimento da economia do município de Paulista – PE, facilitando o acesso à informação, à capacitação profissional e ao mercado de trabalho.

Projeto acadêmico desenvolvido com foco no desenvolvimento econômico, profissional e social do município de Paulista – PE.
