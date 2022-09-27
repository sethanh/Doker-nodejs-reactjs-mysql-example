"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let InvoicesDetail = sequelize.define("invoices_detail", {
  id_invoice : Sequelize.INTEGER,
  id_product : Sequelize.INTEGER,
  quantify : Sequelize.INTEGER,
}, {
  tableName: "invoices_detail",
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
InvoicesDetail.removeAttribute("id");

module.exports = InvoicesDetail;