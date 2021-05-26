'use strict';

module.exports = (sequelize, DataTypes) => {
  let DadoSensor = sequelize.define('DadoSensor', {
    sensor_id: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
		},		
		id: {
			field: 'idDadoSensor',
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
		numero: {
			field: 'numero',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		complemento: {
			field: 'complemento',
			type: DataTypes.STRING,
		},
    bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
      allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.CHAR(8),
      allowNull: false
		},
    cidade: {
			field: 'cidade',
			type: DataTypes.STRING,
      allowNull: false
		},
    estado: {
      field: 'estado',
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
		tableName: 'endereco', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	})

  return DadoSensor;
}