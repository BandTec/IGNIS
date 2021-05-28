'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Terreno = sequelize.define('Terreno', {
        id: {
            field: 'idTerreno',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            field: 'nomeTerreno',
            type: DataTypes.STRING,
            allowNull: false
        },
        tamanho: {
            field: 'tamanhoTerreno',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endereco_id: {
            field: 'fkEndereco',
            type: DataTypes.INTEGER,
            references: {
                model: 'endereco',
                key: 'id'
            }
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
            tableName: 'terreno',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Terreno;
};
