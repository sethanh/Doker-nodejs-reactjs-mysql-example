"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let CartDetail = sequelize.define("cart_detail", {
  id_customer : Sequelize.INTEGER,
  id_product : Sequelize.INTEGER,
  quantify : Sequelize.INTEGER,
}, {
  tableName: "cart_detail",
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
CartDetail.removeAttribute("id");

module.exports = CartDetail;