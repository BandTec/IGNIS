function validar() {
    var nome = in_nome.value;
    var telefone = in_telefone.value;
    var cpf = in_cpf.value;
    var cpfCadastro = 11122233311;
    var cargo = in_cargo.value;
    var email = in_email.value;
    var password = in_senha.value;
    var passwordConf = in_senha_confirmacao.value;

    if(nome.length <= 0 || telefone.length <= 0 || cpf.length <= 0 || cargo.length <= 0 || email.length <= 0 || password.length <= 0) {
        div_nome.innerHTML = "Preencha todos os campos!" 
    } else if (email.indexOf("@") < 5 || email.indexOf(".com") < 6) {
        div_email.innerHTML = "Email inválido"
    } else if(cpf != cpfCadastro) {
        div_cpf.innerHTML = "Este CPF não existe no sistema"
    } else  if (password != passwordConf) {
        div_senha_confir.innerHTML = "As senhas estão divergentes"
    } else {
        window.location.href = "login.html";
    }

    setTimeout(() => {
        div_nome.innerHTML = '';
        div_email.innerHTML = '';
        div_cpf.innerHTML = '';
        div_senha_confir.innerHTML = '';
    }, 5000)
    
}

function validarSenha() {

    var password = in_senha.value;

    if (password.length <= 6) {
        div_senha.innerHTML = "Senha Fraca"
        div_senha.style.color = "red"
    } else if (password.length <= 12) {
        div_senha.innerHTML = "Senha Média"
        div_senha.style.color = "#acaf00"
    } else {
        div_senha.innerHTML = "Senha Forte"
        div_senha.style.color = "green"
    }
    
}

function validarEmpresa() {
    var nomeEmpresarial = in_nome.value;
    var cep = in_cep.value;
    var bairro = in_bairro.value;
    var cidade = in_cidade.value;
    var cnpj = in_cnpj.value;
    var endereco = in_endereco.value;
    var estado = in_estado.value;

    if(nomeEmpresarial.length <= 0 || cep.length <= 0 || bairro.length <= 0 || cidade.length <= 0 || cnpj.length <= 0 || endereco.length <= 0 || estado.length <= 0) {
        div_nome.innerHTML = "Preencha todos os campos!" 
    } else if (cnpj.length < 14 || cnpj.length > 14 ) {
        div_cnpj.innerHTML = "CNPJ inválido"
    } else {
        window.location.href = "cadastro.html";
    }

    setTimeout(() => {
        div_nome.innerHTML = '';
        div_cnpj.innerHTML = '';
    }, 5000)
}

function cadastrar() {
    var nome = in_nome.value;
    var email = in_email.value;
    var cpf = in_cpf.value;
    var cargo = in_cargo.value;

    if (nome == "" || email == "" || cpf == "" || cargo == "") {
      div_nome.innerHTML = "Todos os campos devem ser preenchidos";
    } else if (cpf.length < 11 || cpf.length > 11) {
      div_cpf.innerHTML = "Insira um CPF válido";
    } else if ( email.indexOf("@") < 5 || email.indexOf(".com") < 6) {
      div_email.innerHTML = "Insira um email válido";
    } else {
      window.location.href = "cadastro.html";
    }

    setTimeout(() => {
        div_nome.innerHTML = '';
        div_cpf.innerHTML = '';
        div_email.innerHTML = ''
    }, 5000)
  }