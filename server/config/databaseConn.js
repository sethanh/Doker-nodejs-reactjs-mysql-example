let Sequelize = require("sequelize");

let sequelize = new Sequelize("books", "MYSQL_USER", "MYSQL_PASSWORD", {
  host: "mysql_db",
  dialect: "mysql"
});

module.exports = sequelize;