'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_details.init({
    quantify: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    id_customer: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart_details',
  });
  return Cart_details;
};