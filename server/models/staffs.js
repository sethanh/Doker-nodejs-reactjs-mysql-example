'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Staffs.init({
    status: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_shop: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Staffs',
  });
  return Staffs;
};