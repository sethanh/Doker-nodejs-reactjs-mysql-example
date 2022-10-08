const db = require("../../models");
const { shops, managers } = db;
const { sendOk ,sendErr} = require('../../components');

let index = async (req, res, next) => {
  const { body, user } = req;

};

let create = async (req, res, next) => {
  const { body, user } = req;
  if (user) {
    try {
      const { id } = user;
      let manager = await managers.findOne({ where: { id_user: id } })
      let dataShops = await shops.create({ ...body, id_manager: manager.id })
      return sendOk({
        res,
        status: 200,
        message: 'Tạo shop thành công',
        error: false,
        data: dataShops
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