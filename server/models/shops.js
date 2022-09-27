'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shops.init({
    phone: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    rule: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    star: DataTypes.DOUBLE,
    slogan: DataTypes.STRING,
    id_manager: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Shops',
  });
  return Shops;
};