import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('Clients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cin: {
      type: DataTypes.STRING(21),
      allowNull: false,
      validate: {
        len: [21, 21],
      },
    },
    pincode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      validate: {
        len: [6, 6],
      },
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'cwlr_clients',
  });
}
