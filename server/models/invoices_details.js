'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoices_details.init({
    quantify: DataTypes.INTEGER,
    id_invoices: DataTypes.INTEGER,
    id_product : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoices_details',
  });
  return Invoices_details;
};