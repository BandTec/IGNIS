process.env.NODE_ENV = 'production'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var ClientesRouter = require('./routes/clientes');
var dadosSensorRouter = require('./routes/dadosSensor')
var emailsRouter = require("./routes/emails");

var app = express();

app.use(logger('production'));  // altere para 'production' ou 'dev'
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/dadosSensor', dadosSensorRouter);
app.use('/clientes', ClientesRouter);
app.use('/emails', emailsRouter);

module.exports = app;
