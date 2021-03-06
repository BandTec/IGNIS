var express = require("express");
var router = express.Router();
var sequelize = require("../models").sequelize;
var Usuario = require("../models").Usuario;
var Telefone = require("../models").Telefone;

let sessoes = [];

/* Cadastrar usuário */
router.post("/cadastrar/:idEmpresa", function (req, res, next) {
  console.log("Criando um usuário");

  let idEmpresa = req.params.idEmpresa

  Telefone.create({
    telefone: req.body.numero,
    cliente_id: idEmpresa,
  });

  Usuario.create({
    nome: req.body.nome,
    cpf: req.body.cpf,
    cargo: req.body.cargo,
    email: req.body.email,
    senha: req.body.senha,
    permissao: req.body.permissao,
    cliente_id: idEmpresa
  })
    .then((resultado) => {
      console.log(`Registro criado: ${resultado}`);
      res.send(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

/* Recuperar usuário por login e senha */
router.post("/autenticar", function (req, res, next) {
  console.log("Recuperando usuário por login e senha");

  var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
  var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login

  let instrucaoSql = `select * from usuario 
	  inner join cliente
    on fkCliente = idCliente where emailUsuario='${email}' and senhaUsuario='${senha}'`;
    
  console.log(instrucaoSql);

  sequelize
    .query(instrucaoSql, {
      model: Usuario,
    })
    .then((resultado) => {
      console.log(`Encontrados: ${resultado.length}`);

      if (resultado.length == 1) {
        sessoes.push(resultado[0].dataValues.emailUsuario);
        console.log("sessoes: ", sessoes);
        res.json(resultado[0]);
      } else if (resultado.length == 0) {
        res.status(403).send("Login e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

/* Verificação de usuário */
router.get("/sessao/:login", function (req, res, next) {
  let login = req.params.login;
  console.log(`Verificando se o usuário ${login} tem sessão`);

  let tem_sessao = false;
  for (let u = 0; u < sessoes.length; u++) {
    if (sessoes[u] == login) {
      tem_sessao = true;
      break;
    }
  }

  if (tem_sessao) {
    let mensagem = `Usuário ${login} possui sessão ativa!`;
    console.log(mensagem);
    res.send(mensagem);
  } else {
    res.sendStatus(403);
  }
});

/* Logoff de usuário */
router.get("/sair/:login", function (req, res, next) {
  let login = req.params.login;
  console.log(`Finalizando a sessão do usuário ${login}`);
  let nova_sessoes = [];
  for (let u = 0; u < sessoes.length; u++) {
    if (sessoes[u] != login) {
      nova_sessoes.push(sessoes[u]);
    }
  }
  sessoes = nova_sessoes;
  res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});

/* Recuperar todos os usuários */
router.get("/", function (req, res, next) {
  console.log("Recuperando todos os usuários");
  Usuario.findAndCountAll()
    .then((resultado) => {
      console.log(`${resultado.count} registros`);

      res.json(resultado.rows);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.get("/pegarUsuarios/:idEmpresa", function (req, res, next) {
  console.log("Recuperando todos os usuários");

  let idEmpresa = req.params.idEmpresa

  let instrucaoSql = ` select idUsuario, nomeUsuario, cpfUsuario, cargoUsuario, nivelPermissao from Usuario
	  inner join cliente
  	on fkCliente = idCliente
    where idCliente = ${idEmpresa};`;

  console.log(instrucaoSql);

  sequelize
    .query(instrucaoSql, {
      model: Usuario,
    })
    .then((resultado) => {
      console.log(`Encontrados: ${resultado.length}`);
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.delete("/deletar/:id", function (req, res) {
  let id = req.params.id

  let instrucaoSql = ` delete from Usuario where idUsuario = ${id};`;

  console.log(instrucaoSql);

  sequelize
    .query(instrucaoSql, {
      model: Usuario,
    })
    .then((resultado) => {
      console.log(`Deletado com sucesso`);
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

module.exports = router;
