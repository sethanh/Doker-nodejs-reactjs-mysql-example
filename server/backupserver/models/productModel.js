"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let Product = sequelize.define("products", {
  name : Sequelize.STRING,
  image : Sequelize.STRING,
  price : Sequelize.DOUBLE,
  unit: {
    type: Sequelize.ENUM('0','1','2','3','4'),
    default:'0'
  },
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "products",
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

module.exports = Product;