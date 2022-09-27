'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoices_requests.init({
    address_receive: DataTypes.STRING,
    extra_data: DataTypes.STRING,
    status: DataTypes.INTEGER,
    id_customer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoices_requests',
  });
  return Invoices_requests;
};