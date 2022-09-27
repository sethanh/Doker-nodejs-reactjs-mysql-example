
const Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");

const users=require('./users')(sequelize, Sequelize);
const customers = require('./customers')(sequelize, Sequelize);
const staffs = require('./staffs')(sequelize, Sequelize);
const products= require('./products')(sequelize, Sequelize);
const invoices = require('./invoices')(sequelize, Sequelize);
const invoices_reqests= require('./invoices_requests')(sequelize, Sequelize);
const request_details = require('./request_details')(sequelize, Sequelize);
const admins= require('./admins')(sequelize, Sequelize);
const managers= require('./managers')(sequelize, Sequelize);
const shops= require('./shops')(sequelize, Sequelize);
const units= require('./unit_details')(sequelize, Sequelize);
const cart_details= require('./cart_details')(sequelize, Sequelize);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users;
db.customers = customers;
db.staffs = staffs;
db.products = products;
db.invoices = invoices;
db.invoices_requests = invoices_reqests;
db.admins = admins;
db.managers = managers;
db.shops = shops;
db.units = units;
db.request_details = request_details;
db.cart_details = cart_details;

module.exports = db;
