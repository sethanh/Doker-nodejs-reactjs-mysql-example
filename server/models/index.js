const user=require('./userModel');
const customer = require('./customerModel');
const staff = require('./staffModel');
const product= require('./productModel');
const invoices = require('./invoicesModel');
const invoices_rq= require('./invoicesRequestModel');
const invoices_dt= require('./invoicesDetailModel');
const table= require('./tableModel');
const cart= require('./cartDetailModel');
const model={};

model.customer=customer;
model.staff= staff;
model.user= user;
model.product= product;
model.invoices= invoices;
model.invoices_rq= invoices_rq;
model.invoices_dt= invoices_dt;
model.table= table;
model.cart= cart;
model.user.hasMany(model.customer, {foreignKey: 'id_user'})
model.customer.belongsTo(model.user, {foreignKey: 'id_user'})

module.exports= model;