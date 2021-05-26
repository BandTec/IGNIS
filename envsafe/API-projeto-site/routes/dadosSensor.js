var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var DadoSensor = require('../models').DadoSensor;
var env = process.env.NODE_ENV || 'development';