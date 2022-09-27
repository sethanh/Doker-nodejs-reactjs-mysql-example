"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let Staff = sequelize.define("staffs", {
  id_user : Sequelize.INTEGER,
  address: Sequelize.STRING,
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "staffs",
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

module.exports = Staff;