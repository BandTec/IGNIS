var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Cliente = require('../models').Cliente;
var Endereco = require('../models').Endereco

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

  res.send(cliente);

  global.client_id = cliente.dataValues.id
});



module.exports = router;