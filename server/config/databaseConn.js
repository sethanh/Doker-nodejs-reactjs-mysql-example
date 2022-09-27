let Sequelize = require("sequelize");

let sequelize = new Sequelize(process.env.database, process.env.userroot, process.env.passwordroot, {
  host: process.env.host,
  dialect: process.env.dialect,
});

module.exports = sequelize;