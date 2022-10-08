
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
const invoices_details= require('./invoices_details')(sequelize, Sequelize);

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
db.invoices_details= invoices_details;

//associate
//users
db.users.hasMany(db.customers, {foreignKey: 'id_user'});
db.users.hasMany(db.admins, {foreignKey: 'id_user'});
db.users.hasMany(db.managers, {foreignKey: 'id_user'});
db.users.hasMany(db.staffs, {foreignKey: 'id_user'});
//customers
db.customers.belongsTo(db.users, {foreignKey: 'id_user'});
db.customers.hasMany(db.invoices_requests, {foreignKey: 'id_customer'});
db.customers.hasMany(db.cart_details, {foreignKey: 'id_customer'});
db.customers.hasMany(db.invoices, {foreignKey: 'id_customer'});
//managers
db.managers.belongsTo(db.users, {foreignKey: 'id_user'});
db.managers.hasMany(db.shops, {foreignKey: 'id_manager'});
//shops
db.shops.hasMany(db.staffs, {foreignKey: 'id_shop'});
db.shops.hasMany(db.products, {foreignKey: 'id_shop'});
db.shops.hasMany(db.staffs, {foreignKey: 'id_shop'});
//staffs
db.staffs.belongsTo(db.users, {foreignKey: 'id_user'});
db.staffs.belongsTo(db.shops, {foreignKey: 'id_shop'});
db.staffs.hasMany(db.invoices, {foreignKey: 'id_staff'});
//admins
db.admins.belongsTo(db.users, {foreignKey: 'id_user'});
//cart_details
db.cart_details.belongsTo(db.customers, {foreignKey: 'id_customer'});
db.cart_details.belongsTo(db.products, {foreignKey: 'id_product'});
//invoices_requests
db.invoices_requests.hasMany(db.request_details, {foreignKey: 'id_invoices_request'});
db.invoices_requests.belongsTo(db.customers, {foreignKey: 'id_customer'});
//request_details
db.request_details.belongsTo(db.invoices_requests, {foreignKey: 'id_invoices_request'});
db.request_details.belongsTo(db.products, {foreignKey: 'id_product'});
//invoices
db.invoices.hasMany(db.invoices_details, {foreignKeyy: 'id_invoices'});
db.invoices.belongsTo(db.customers, {foreignKey: 'id_customer'});
db.invoices.belongsTo(db.staffs, {foreignKey: 'id_staff'});
//invoices_details
db.invoices_details.belongsTo(db.invoices, {foreignKey: 'id_invoices'});
db.invoices_details.belongsTo(db.products, {foreignKey: 'id_product'});
//products
db.products.belongsTo(db.units, {foreignKey: 'unit'});
db.products.belongsTo(db.shops, {foreignKey: 'id_shop'});
db.products.hasMany(db.invoices_details, {foreignKey: 'id_product'});
db.products.hasMany(db.request_details, {foreignKey: 'id_product'});

module.exports = db;