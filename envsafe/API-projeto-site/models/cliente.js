'use strict';

module.exports = (sequelize, DataTypes) => {
  let Cliente = sequelize.define('Cliente', {
    id: {
      field: 'idCliente',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      field: 'nomeCliente',
      type: DataTypes.STRING,
      allowNull: false
    },
    cnpj: {
      field: 'cnpjCliente',
      type: DataTypes.CHAR(14),
      allowNull: false
    }, 
    endereco_id: {
      field: 'fkEndereco',
      type: DataTypes.INTEGER,
      references: {
        model: 'endereco',
        key: 'id'
      }
    }
  },
  {
    tableName: 'cliente',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  return Cliente;
}