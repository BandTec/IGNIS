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
    status: {
      field: 'statusCliente',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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