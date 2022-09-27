'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request_details.init({
    quantify: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    id_invoices_request: DataTypes.INTEGER,
    id_product : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Request_details',
  });
  return Request_details;
};