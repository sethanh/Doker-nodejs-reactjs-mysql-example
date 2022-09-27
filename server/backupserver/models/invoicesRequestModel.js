"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let InvoicesRequest = sequelize.define("invoices_request", {
  id_customer : Sequelize.INTEGER,
  address_receive : Sequelize.STRING,
  orders : Sequelize.STRING,
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "invoices_request",
  createdAt: "created_at",
  updatedAt: "updated_at",
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = InvoicesRequest;