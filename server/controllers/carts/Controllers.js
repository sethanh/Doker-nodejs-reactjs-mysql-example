const db = require("../../models");
const { cart_details, customers } = db;
const { sendOk, sendErr } = require('../../components');

let index = async (req, res, next) => {
  const { body, user } = req;

};

let create = async (req, res, next) => {
  const { user, body } = req;
  if (user) {
    try {
      const { id } = user;
      const customer = await customers.findOne({ where: { id } });
      const data = await cart_details.create({ ...body, id_customer: customer.id });
      return sendOk({
        res,
        status: 200,
        message: 'Tạo thành công Cart',
        error: false,
        data
      });
    } catch (err) {
      return sendErr({
        res: res,
        message: JSON.stringify(err),
        status: 500
      })
    }

  }
  else {
    return sendErr({
      res: res,
      message: 'Lỗi xác thực',
      status: 500
    })
  }
}

let show = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let updated = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let destroy = async (req, res, next) => {
  const { params } = req;
  const { id } = params;

};




module.exports = { index, create, updated, destroy, show };