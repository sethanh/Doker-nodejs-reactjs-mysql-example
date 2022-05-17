"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let User = sequelize.define("users", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  name : Sequelize.STRING,
  phone : Sequelize.STRING,
  image : Sequelize.STRING,
  rule: {
    type: Sequelize.ENUM("admin", "customer","staff","management"),
    default:"customer"
  },
  status:{
    type: Sequelize.INTEGER,
    default: 0
  },
}, {
  tableName: "users",
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

module.exports = User;