'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor', {
        id: {
            field: 'idSensor',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        modelo: {
            field: 'modeloSensor',
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            field: 'latitude',
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude: {
            field: 'longitude',
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            field: 'statusSensor',
            type: DataTypes.STRING,
            allowNull: false
        },
        terreno_id: {
            field: 'fkTerreno',
            type: DataTypes.INTEGER,
            references: {
                model: 'terreno',
                key: 'id'
            }
        },
    },
        {
            tableName: 'Sensor',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Sensor;
};
