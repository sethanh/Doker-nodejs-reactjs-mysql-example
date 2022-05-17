const model = require('./../../models');
var mysql = require('mysql');
var options = require('../../config/database');
var con = mysql.createConnection(options);

let { Key } = require('./../../key/keyJWT');
let getInvoicesRequest = async (req, res, next) => {
  try {
    let data = await model.invoices_rq.findAll({});
    return res.status(200).send({
      status: 200,
      message: 'success',
      data,
      error: false
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: 'lỗi server',
      error: true
    });
  }
};
let createInvoicesRequest = async (req, res, next) => {
  const { body } = req;
  try {
    let data = await model.invoices_rq.create(body);
    return res.status(201).send({
      data,
      status: 201,
      message: 'created',
      error: false
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: 'lỗi server',
      error: true
    });
  }
};
let createInvoices = async (req, res, next) => {
  console.log(req.body);
  const { id_customer, id_staff, address_receive, orders } = req.body;
  try {
    let data = await model.invoices.create({ id_customer, id_staff, address_receive });
    let dataOrder = JSON.parse(orders);
    for (let i = 0; i < dataOrder.length; i++) {
      let id_invoice = data.id;
      let id_product = dataOrder[i].id_product;
      let quantify = dataOrder[i].quantify;
      let datadt= await model.invoices_dt.create({ id_invoice, id_product, quantify });
      // let sql = `INSERT INTO invoices_detail (id_invoice, id_product, quantify) VALUES (${id_invoice},${id_product},${quantify})`;
      // await con.query(sql);
    }
    return res.status(201).send({
      status: 201,
      message: 'created invoices',
      error: false
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: 'lỗi server',
      error: true
    });
  }
};

module.exports = { getInvoicesRequest, createInvoicesRequest, createInvoices };