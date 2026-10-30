# Trabalha Paulista - Portal de Empreendedorismo e Capacitação

Bem-vindo ao repositório do front-end do **Trabalha Paulista**, uma plataforma web desenvolvida para fomentar o empreendedorismo local na cidade de Paulista, conectar cidadãos a oportunidades de emprego e oferecer trilhas de capacitação profissional.

## 🚀 Sobre o Projeto

O **Trabalha Paulista** nasce com o propósito de fortalecer a economia local da cidade de Paulista, servindo como uma ponte digital entre empreendedores, trabalhadores locais e oportunidades de capacitação. A interface foi pensada para ser intuitiva, acessível e responsiva, garantindo uma experiência fluida em diferentes dispositivos.

Durante o desenvolvimento, utilizamos o **Trello** como ferramenta de gestão de projetos (metodologia ágil/Kanban) para organizar as demandas, acompanhar o fluxo de entregas (Backlog, Em Desenvolvimento, Testes e Concluído) e definir as prioridades das sprints.

## 🛠️ Funcionalidades do Front-End

O protótipo/front-end conta com as seguintes telas e fluxos implementados:

1. **Página de Login (`/login`)**
   * Interface de autenticação para usuários cadastrados (cidadãos e empreendedores).
   * Validação de campos de e-mail/CPF e senha.
   * Link de acesso rápido para as telas de cadastro e recuperação de senha.

2. **Cadastro de Usuário (`/cadastro`)**
   * Formulário intuitivo para novos usuários criarem sua conta na plataforma.
   * Coleta de dados essenciais para perfil profissional ou de negócio local.

3. **Recuperação de Senha - "Esqueci minha senha" (`/esqueci-senha`)**
   * Tela para envio de link/código de redefinição de senha via e-mail ou SMS cadastrado.

4. **Área Restrita (`/dashboard` ou `/painel`)**
   * Página protegida acessível apenas após o login bem-sucedido.
   * Visão personalizada dependendo do perfil do usuário (trabalhador em busca de vagas ou empreendedor local).

5. **Página de Conteúdo Temático (`/conteudo`)**
   * Seção central dedicada a artigos, dicas de empreendedorismo local, editais, notícias da cidade de Paulista e avisos sobre cursos de capacitação.

6. **Logout (Saída Segura)**
   * Mecanismo seguro de encerramento de sessão na área restrita, limpando os dados de autenticação locais e redirecionando o usuário de volta à página inicial ou de login.

## 🧩 Organização e Metodologia (Trello)

O projeto foi estruturado com o auxílio do **Trello** para gerenciar o escopo de entregas do front-end. As colunas principais utilizadas no nosso quadro foram:
* **Backlog:** Ideias e requisitos iniciais das telas e fluxos.
* **A Fazer (To Do):** Tarefas priorizadas para a sprint atual.
* **Em Desenvolvimento (Doing):** Telas e componentes sendo codificados (HTML, CSS, JavaScript).
* **Em Revisão / Testes:** Validação de responsividade, usabilidade e fluxo de login/logout.
* **Concluído (Done):** Funcionalidades finalizadas e integradas.

## 👥 Integrantes da Equipe

| Nome do Integrante |  Matricula |
| :--- | :--- | :--- |
| **Marcus Vinicius** | 01813459 | 
| **Gabriel Andrade2** | 01803645 | 
| **Welson Dias** | 01809689 | 
| **Irlania Felix** |  01808910| 
| **Micaias Alexandre** |  01825976 | 

## ⚙️ Tecnologias Utilizadas

* **HTML5 / CSS3:** Estruturação semântica e estilização moderna.
* **JavaScript:** Manipulação de eventos, simulação de rotas protegidas e controle de sessão.

## 📥 Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/Gabriel456-lab/Trabalha-Paulista
   ```
2. Abra a pasta do projeto no seu editor de código favorito (ex: VS Code).
3. Abra o arquivo principal (`index.html`) no navegador ou utilize uma extensão como o *Live Server*.

## 🤝 Contribuição

Projeto desenvolvido com foco no impacto social e econômico do município de Paulista-PE. Sugestões e melhorias são sempre bem-vindas através de *Pull Requests* ou abertura de *Issues*.