'use strict';

module.exports = (sequelize, DataTypes) => {
	let DadoSensor = sequelize.define('DadoSensor', {
		id: {
			field: 'idDadoSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		temperatura: {
			field: 'temperaturaSensor',
			type: DataTypes.FLOAT,
			allowNull: false
		},
		umidade: {
			field: 'umidadeSensor',
			type: DataTypes.FLOAT,
			allowNull: false
		},
		momento: {
			field: 'momento',
			type: DataTypes.DATE,
		},
		sensor_id: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			references: {
				model: 'sensor',
				key: 'id'
			}
		}
	},
		{
			tableName: 'dadosensor',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		})

	return DadoSensor;
}