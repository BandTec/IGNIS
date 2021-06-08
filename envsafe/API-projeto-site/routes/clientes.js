var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Cliente = require('../models').Cliente;
var Endereco = require('../models').Endereco;
var env = process.env.NODE_ENV || "development";

/* Cadastrar Empresa */
router.post('/cadastrar', async function(req, res, next) {
  console.log('Cadastrando Empresa');

  var rua = (req.body.endereco).split(', ')

  let endereco = await Endereco.create({
    cep: req.body.cep,
    logradouro: rua[0],
    numero: rua[1],
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    uf: req.body.uf
  })

  let cliente = await Cliente.create({
    nome: req.body.nome,
    cnpj: req.body.cnpj,
    endereco_id: endereco.dataValues.id
  })

  console.log(cliente)

  res.send({ id : cliente.dataValues.id})

  global.client_id = cliente.dataValues.id
});

router.get('/atualizar/:idEmpresa', function(req, res, next) {

  var idCliente = req.params.idEmpresa
  
  let instrucaoSql = "";

  if (env == "dev") {
    // abaixo, escreva o select de dados para o Workbench
    instrucaoSql = ` select idTerreno, nomeTerreno from terreno 
      inner join cliente
      on fkCliente = idCliente
      where idCliente = ${idCliente};`;
  } else if (env == "production") {
    // abaixo, escreva o select de dados para o SQL Server
    instrucaoSql = `select top 1 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc`;
  } else {
    console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n");
  }

  console.log(instrucaoSql);

  sequelize
    .query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
    .then((resultado) => {
      res.json(resultado);
      console.log(resultado)
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
})


module.exports = router;