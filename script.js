/* ==========================================================
   Trabalha Paulista – lógica do front end
   Cadastro, login, recuperação de senha, logoff e vagas.
   Dados ficam no navegador (localStorage) apenas para demo.
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Utilitários ---------- */
  var $ = function (selector) {
    return document.querySelector(selector);
  };

  // Armazenamento: usa localStorage e cai para memória se não estiver disponível
  var memoria = { users: [], session: null };

  function carregar(chave, padrao) {
    try {
      var valor = localStorage.getItem(chave);
      return valor ? JSON.parse(valor) : padrao;
    } catch (erro) {
      return memoria[chave] !== undefined ? memoria[chave] : padrao;
    }
  }

  function salvar(chave, valor) {
    memoria[chave] = valor;
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      /* sem localStorage: segue só em memória */
    }
  }

  function mostrarAviso(texto) {
    var el = $('#toast');
    el.textContent = texto;
    el.style.display = 'block';
    clearTimeout(mostrarAviso.timer);
    mostrarAviso.timer = setTimeout(function () {
      el.style.display = 'none';
    }, 6000);
  }

  function mostrarMensagem(seletor, texto, sucesso) {
    var el = $(seletor);
    el.textContent = texto;
    el.className = 'msg' + (sucesso ? ' ok' : '');
  }

  /* ---------- Estado ---------- */
  var usuarios = carregar('users', []);
  var sessao = carregar('session', null);
  var recuperacao = null; // { user, code } durante a recuperação de senha

  /* ---------- Dados do tema: vagas ---------- */
  var VAGAS = [
    ['Atendente de loja', 'Centro de Paulista · Comércio', 'CLT'],
    ['Auxiliar administrativo', 'Janga · Serviços', 'CLT'],
    ['Técnico em informática', 'Pau Amarelo · Tecnologia', 'PJ'],
    ['Cozinheiro(a)', 'Maranguape I · Restaurante', 'CLT'],
    ['Jovem aprendiz', 'Paratibe · Diversos', 'Aprendiz']
  ];

  $('#vagas').innerHTML = VAGAS.map(function (vaga) {
    return (
      '<div class="job">' +
        '<h3>' + vaga[0] + '</h3>' +
        '<span>' + vaga[1] + '</span><br>' +
        '<em>' + vaga[2] + '</em>' +
      '</div>'
    );
  }).join('');

  /* ---------- Navegação entre telas ---------- */
  function mostrarTela(id, forcar) {
    // A área restrita só abre com sessão ativa
    if (id === 'home' && !sessao && !forcar) {
      id = 'login';
    }

    $('.app').classList.toggle('nohead', id === 'logoff2');

    document.querySelectorAll('section').forEach(function (secao) {
      secao.classList.toggle('on', secao.id === id);
    });

    var primeiroCampo = document.querySelector('#' + id + ' input');
    if (primeiroCampo && id !== 'home') {
      primeiroCampo.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }

  // Qualquer elemento com data-go="tela" navega para a tela indicada
  document.addEventListener('click', function (e) {
    var botao = e.target.closest('[data-go]');
    if (botao) {
      e.preventDefault();
      mostrarTela(botao.dataset.go);
    }
  });

  function entrar(usuario) {
    sessao = usuario.user;
    salvar('session', sessao);
    $('#hOla').textContent = 'Olá, ' + usuario.nome.split(' ')[0] + '!';
    mostrarTela('home');
  }

  /* ---------- Login ---------- */
  $('#fLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    var identificador = $('#lUser').value.trim().toLowerCase();
    var senha = $('#lPass').value;

    if (!identificador || !senha) {
      return mostrarMensagem('#lMsg', 'Preencha usuário e senha.');
    }

    var usuario = usuarios.find(function (u) {
      return (u.user === identificador || u.email === identificador) && u.pass === senha;
    });
    if (!usuario) {
      return mostrarMensagem('#lMsg', 'Usuário ou senha incorretos.');
    }

    mostrarMensagem('#lMsg', '');
    $('#lPass').value = '';
    entrar(usuario);
  });

  /* ---------- Cadastro ---------- */
  $('#fReg').addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = $('#rNome').value.trim();
    var user = $('#rUser').value.trim().toLowerCase();
    var email = $('#rMail').value.trim().toLowerCase();
    var senha = $('#rPass').value;

    if (!nome || !user || !email || !senha) {
      return mostrarMensagem('#rMsg', 'Preencha todos os campos.');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return mostrarMensagem('#rMsg', 'Digite um email válido.');
    }
    if (senha.length < 6) {
      return mostrarMensagem('#rMsg', 'A senha precisa ter ao menos 6 caracteres.');
    }
    if (senha !== $('#rPass2').value) {
      return mostrarMensagem('#rMsg', 'As senhas não conferem.');
    }
    if (usuarios.some(function (u) { return u.user === user || u.email === email; })) {
      return mostrarMensagem('#rMsg', 'Usuário ou email já cadastrado.');
    }

    var novo = { nome: nome, user: user, email: email, pass: senha };
    usuarios.push(novo);
    salvar('users', usuarios);

    mostrarMensagem('#rMsg', '');
    e.target.reset();
    mostrarAviso('Cadastro concluído! Bem-vindo(a).');
    entrar(novo);
  });

  /* ---------- Recuperação de senha: etapa 1 (email) ---------- */
  function enviarCodigo() {
    recuperacao.code = String(Math.floor(100000 + Math.random() * 900000));
    mostrarAviso(
      'Modo demonstração: seu código é ' + recuperacao.code +
      ' (em produção ele chega por email).'
    );
  }

  $('#fEsq').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('#eMail').value.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return mostrarMensagem('#eMsg', 'Digite um email válido.');
    }
    var usuario = usuarios.find(function (u) { return u.email === email; });
    if (!usuario) {
      return mostrarMensagem('#eMsg', 'Não encontramos esse email.');
    }

    mostrarMensagem('#eMsg', '');
    recuperacao = { user: usuario.user };
    enviarCodigo();
    campos.forEach(function (campo) { campo.value = ''; });
    mostrarTela('codigo');
  });

  /* ---------- Recuperação de senha: etapa 2 (código) ---------- */
  var campos = [].slice.call(document.querySelectorAll('#codeBox input'));

  campos.forEach(function (campo, i) {
    // Aceita só números e avança para o próximo campo
    campo.addEventListener('input', function () {
      campo.value = campo.value.replace(/\D/g, '');
      if (campo.value && campos[i + 1]) campos[i + 1].focus();
    });

    // Backspace em campo vazio volta ao anterior
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !campo.value && campos[i - 1]) campos[i - 1].focus();
    });

    // Colar o código inteiro preenche todos os campos
    campo.addEventListener('paste', function (e) {
      var texto = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (!texto) return;
      e.preventDefault();
      texto.split('').forEach(function (digito, j) { campos[j].value = digito; });
      campos[Math.min(texto.length, 5)].focus();
    });
  });

  $('#reenviar').addEventListener('click', function () {
    if (recuperacao) {
      enviarCodigo();
      mostrarMensagem('#cMsg', 'Novo código enviado.', true);
    }
  });

  $('#cEnviar').addEventListener('click', function () {
    var digitado = campos.map(function (c) { return c.value; }).join('');

    if (digitado.length < 6) {
      return mostrarMensagem('#cMsg', 'Digite os 6 dígitos.');
    }
    if (!recuperacao || digitado !== recuperacao.code) {
      return mostrarMensagem('#cMsg', 'Código incorreto.');
    }

    mostrarMensagem('#cMsg', '');
    mostrarTela('redefinir');
  });

  /* ---------- Recuperação de senha: etapa 3 (nova senha) ---------- */
  $('#fRed').addEventListener('submit', function (e) {
    e.preventDefault();
    var senha = $('#nPass').value;

    if (senha.length < 6) {
      return mostrarMensagem('#nMsg', 'A senha precisa ter ao menos 6 caracteres.');
    }

    var usuario = usuarios.find(function (u) { return u.user === recuperacao.user; });
    usuario.pass = senha;
    salvar('users', usuarios);

    recuperacao = null;
    e.target.reset();
    mostrarMensagem('#nMsg', '');
    mostrarAviso('Senha redefinida. Entre com a nova senha.');
    mostrarTela('login');
  });

  /* ---------- Logoff ---------- */
  document.querySelectorAll('#sair, #sair2').forEach(function (botao) {
    botao.addEventListener('click', function () {
      sessao = null;
      salvar('session', null);
      mostrarAviso('Você saiu com segurança.');
      mostrarTela('inicio');
    });
  });

  /* ---------- Inicialização ---------- */
  // Restaura a sessão, se houver
  if (sessao) {
    var logado = usuarios.find(function (u) { return u.user === sessao; });
    if (logado) {
      $('#hOla').textContent = 'Olá, ' + logado.nome.split(' ')[0] + '!';
      mostrarTela('home');
    } else {
      sessao = null;
    }
  }

  // Permite abrir uma tela direto pelo endereço (ex.: index.html#codigo)
  var hash = location.hash.slice(1);
  var alvo = hash && document.getElementById(hash);
  if (alvo && alvo.tagName === 'SECTION') {
    mostrarTela(hash, true);
  }
})();
