'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Telefone = sequelize.define('Telefone',{
		id: {
			field: 'idTelefone',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		telefone: {
			field: 'numeroTelefone',
			type: DataTypes.STRING,
			allowNull: false
		},
		cliente_id: {
      field: 'fkCliente',
      type: DataTypes.INTEGER,
      references: {
        model: 'cliente',
        key: 'id'
      }
    }
	}, 
	{
		tableName: 'telefone', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Telefone;
};
