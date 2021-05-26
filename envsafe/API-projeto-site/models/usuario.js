	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nomeUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf: {
			field: 'cpfUsuario',
			type: DataTypes.STRING,
			allowNull: false
		}, 
		cargo: {
			field: 'cargoUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		permissao: {
			field: 'nivelPermissao',
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false
		}, 
		email: {
			field: 'emailUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senhaUsuario',
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
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
