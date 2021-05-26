'use strict';

module.exports = (sequelize, DataTypes) => {
  let Endereco = sequelize.define('Endereco', {
    id: {
			field: 'idEndereco',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
			type: DataTypes.STRING
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
    uf: {
      field: 'uf',
      type: DataTypes.CHAR(2),
      allowNull: false
    }
  },
  {
		tableName: 'endereco', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false
	})

  return Endereco;
}