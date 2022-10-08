const userController = require('./users/Controllers');
const shopController = require('./shops/Controllers');
const staffController = require('./staffs/Controllers');
const unitController = require('./units/Controllers');
const productController = require('./products/Controllers');
const InvoicesRequestController = require('./invoices/RequestControllers');
const CartController = require('./carts/Controllers');
const uploadsController= require('./uploads/Controllers');

module.exports = { 
    userController,shopController, staffController, unitController,
    productController, InvoicesRequestController, CartController, 
    uploadsController
 };