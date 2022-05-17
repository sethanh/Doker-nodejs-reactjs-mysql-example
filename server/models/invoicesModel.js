"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let Invoices = sequelize.define("invoices", {
  id_customer : Sequelize.INTEGER,
  id_staff : Sequelize.INTEGER,
  address_receive : Sequelize.STRING,
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "invoices",
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

module.exports = Invoices;