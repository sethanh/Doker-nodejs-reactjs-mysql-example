"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// const user= require("./userModel");

let Customer = sequelize.define("customers", {
  id_user: Sequelize.INTEGER,
  id_facebook: Sequelize.STRING,
  address: Sequelize.STRING,
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "customers",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
module.exports = Customer;
