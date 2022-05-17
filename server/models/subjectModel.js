"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let Subjects = sequelize.define("subject", {
  vietnam: Sequelize.STRING,
  english: Sequelize.STRING,
  subject: Sequelize.STRING,
}, {
  tableName: "subject",
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

module.exports = Subjects;