let login_usuario;
let nome_usuario;

function validarSenha() {
  var password = in_senha.value;

  if (password.length <= 6) {
    div_senha.innerHTML = "Senha Fraca";
    div_senha.style.color = "red";
  } else if (password.length <= 12) {
    div_senha.innerHTML = "Senha Média";
    div_senha.style.color = "#acaf00";
  } else {
    div_senha.innerHTML = "Senha Forte";
    div_senha.style.color = "green";
  }
}

function compararSenhas() {
  var senha = document.getElementById("in_senha").value;
  var senhaConfirmacao = document.getElementById("in_senha_confirmacao").value;

  if (senha !== senhaConfirmacao) {
    div_err.innerHTML = "Senhas estão divergentes";
    return false;
  } else {
    entrar();
  }
}

function entrar() {
  var formulario = new URLSearchParams(new FormData(form_login));
  fetch("/usuarios/autenticar", {
    method: "POST",
    body: formulario,
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then((json) => {
        sessionStorage.login_usuario_meuapp = json.emailUsuario;
        sessionStorage.nome_usuario_meuapp = json.nomeUsuario;

        if(json.nivelPermissao == 0) {
          window.location.href = "sem_permissao/grafico.html";
        } else if (json.nivelPermissao == 1) {
          window.location.href = "permissao_total/grafico.html";
        }

      });
    } else {
      console.log("Erro de login!");

      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });

  return false;
}

function cadastrar_usuario() {
  var formulario = new URLSearchParams(new FormData(form_cadastro_usuario));
  fetch("/usuarios/cadastrar", {
    method: "POST",
    body: formulario,
  }).then(function (response) {
    if (response.ok) {
      window.location.href = "login.html";
    } else {
      console.log("Erro de cadastro");
      response.text().then(function (resposta) {
        div_erro.innerHTML = resposta;
      });
    }
  });

  return false;
}

function cadastrar_usuario_dashboard() {
  var formulario = new URLSearchParams(new FormData(form_cadastro_usuario_dashboard));
  fetch("/usuarios/cadastrar", {
    method: "POST",
    body: formulario,
  }).then(function (response) {
    if (response.ok) {
      alert ("Cadastro Efetuado");
    } else {
      console.log("Erro de cadastro");
      response.text().then(function (resposta) {
        div_erro.innerHTML = resposta;
      });
    }
  });

  return false;
}


function cadastrar() {
  var formulario = new URLSearchParams(new FormData(form_cadastro));
  fetch("/clientes/cadastrar", {
    method: "POST",
    body: formulario,
  }).then(function (response) {
    if (response.ok) {
      window.location.href = "cadastro.html";
    } else {
      console.log("Erro de cadastro");
      response.text().then(function (resposta) {
        div_erro.innerHTML = resposta;
      });
    }
  });

  return false;
}

function validarSessao() {
  fetch(`/usuarios/sessao/${login_usuario}`, { cache: "no-store" }).then(
    (answer) => {
      if (answer.ok) {
        answer.text().then((text) => {
          console.log("Sessão :)", text);
        });
      } else {
        console.error("Sessão :.(");
        sair();
      }
    }
  );
}

function verificarAutenticacao() {
  login_usuario = sessionStorage.login_usuario_meuapp;
  nome_usuario = sessionStorage.nome_usuario_meuapp

  if (login_usuario == undefined) {
    redirecionarLogin();
  } else {
    
    var html_tag = Array.from(document.getElementsByClassName('nome_usuario_html'))
    
    html_tag.forEach(element => {
      element.innerHTML = nome_usuario;
    });

    validarSessao();
  }
}

function sair() {
  finalizar_sessao();
  sessionStorage.clear();
  redirecionarLogin();
}

function finalizar_sessao() {
  fetch(`/usuarios/sair/${login_usuario}`, { cache: "no-store" });
}

function redirecionarLogin() {
  window.location.href = "../login.html";
}
