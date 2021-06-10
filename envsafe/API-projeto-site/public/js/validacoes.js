let login_usuario;
let nome_usuario;
let empresa_usuario;

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
        sessionStorage.setItem("idCliente", json.fkCliente)

        const data = new Date();

        sessionStorage.setItem("Dia", data)

        if(json.statusCliente == 0) {
          window.location.href = "negociacao.html";
        } else {
          if (json.nivelPermissao == 0) {
            window.location.href = "sem_permissao/grafico.html";
          } else if (json.nivelPermissao == 1) {
            window.location.href = "permissao_total/grafico.html";
          }
        }
      });
    } else {
      console.log("Erro de login!");

      resposta.text().then((texto) => {
        console.error(texto);
        error.innerHTML = texto;
      });
    }
  });

  return false;
}

function cadastrar_usuario() {
  var formulario = new URLSearchParams(new FormData(form_cadastro_usuario));

  const id = sessionStorage.getItem("id")
  fetch(`/usuarios/cadastrar/${id}`, {
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
  empresa_usuario = sessionStorage.getItem("idCliente");

  var formulario = new URLSearchParams(
    new FormData(form_cadastro_usuario_dashboard)
  );
  fetch(`/usuarios/cadastrar/${empresa_usuario}`, {
    method: "POST",
    body: formulario,
  }).then(function (response) {
    if (response.ok) {
      alert("Cadastro Efetuado");
      window.location.href = "cadastro.html"
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
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
        sessionStorage.setItem("id", resposta.id)

        window.location.href = "cadastro.html";
      });
      // 
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
  nome_usuario = sessionStorage.nome_usuario_meuapp;

  if (login_usuario == undefined) {
    redirecionarLogin();
  } else {
    var html_tag = Array.from(
      document.getElementsByClassName("nome_usuario_html")
    );

    html_tag.forEach((element) => {
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

function deletarUsuario(id_parametros) {
  const confirmacao = confirm("Realmente deseja excluir este funcionário?")

  if(confirmacao) {
    fetch(`/usuarios/deletar/${id_parametros}`, {
      method: "DELETE",
    }).then(_ => {
      atualizarUsuario()
    });
  }
}

function atualizarUsuario() {
  empresa_usuario = sessionStorage.getItem("idCliente");

  fetch(`/usuarios/pegarUsuarios/${empresa_usuario}`).then((resposta) => {
    console.log(resposta);
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        tabela_usuarios.innerHTML = `<tr class="row">
              <th>Permissão</th>
              <th>Nome Completo</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Deletar</th>
            </tr>`;

        for (let i = 0; i < resposta.length; i++) {
          tabela_usuarios.innerHTML += `<tr>
              <td>${resposta[i].nivelPermissao == '1' ? "Total" : "Parcial"}</td>
              <td>${resposta[i].nomeUsuario}</td>
              <td>${resposta[i].cpfUsuario}</td>
              <td>${resposta[i].cargoUsuario}</td>
              <td>
                <img src="../img/delete.svg" onclick="deletarUsuario(${resposta[i].idUsuario})" />
              </td>
            </tr>`;
        }
      });
    } else {
      console.error("Nenhum Usuário Encontrado");
    }
  });
}