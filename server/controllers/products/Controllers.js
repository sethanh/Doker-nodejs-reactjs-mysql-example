const db = require("../../models");
const { products, staffs } = db;
const { sendOk, sendErr } = require('../../components');

let index = async (req, res, next) => {
  const { body, user } = req;

};

let create = async (req, res, next) => {
  const { user, body } = req;
  if (user) {
    try {
      let data = null;
      const { id, rule } = user;
      if (rule === 'staff') {
        const staff = await staffs.findOne({ where: { id_user: id } });
        const { id_shop } = staff;
        data = await products.create({ ...body, created_by: id, id_shop });
      }
      else {
        data = await products.create({ ...body, created_by: id });
      }
      return sendOk({
        res,
        status: 200,
        message: 'Tạo thành công product',
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