const { sendOk,sendErr } = require('../../components');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require("../../models");
const { shops, managers, users, staffs } = db;

let index = async (req, res, next) => {
  const { body, user } = req;

};

let create = async (req, res, next) => {
  const { user } = req;
  if (user) {
    try {
      const { password, id_shop, ...body } = req.body;
      let salt = bcrypt.genSaltSync(saltRounds);
      let passwordHash = bcrypt.hashSync(password, salt);
      let data = await users.create({ ...body, password: passwordHash });
      let dataStaff = await staffs.create({ id_user: data.id, id_shop, status: 0 });
      // console.log('sj',dataStaff)
      return sendOk({
        res,
        status: 200,
        message: 'Đăng ký thành công',
        error: false,
        data: dataStaff
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