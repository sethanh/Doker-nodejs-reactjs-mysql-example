const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require("../../models");
const { shops,managers, users, staffs } = db;

let getted = async (req, res, next) => {
  const { body, user } = req;

};

let inserted = async (req, res, next) => {
  const { user } = req;
  if (user) {
    try {
      const { password, id_shop ,...body } = req.body;
      let salt = bcrypt.genSaltSync(saltRounds);
      let passwordHash = bcrypt.hashSync(password, salt);
      let data = await users.create({ ...body, password: passwordHash });
      let dataStaff= await staffs.create({ id_user: data.id,id_shop, status:0});
      // console.log('sj',dataStaff)
      return res.status(200).send({
        status: 200,
        message: 'Đăng ký thành công',
        error: false,
        data: dataStaff
      });
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        status: 500,
        message: 'lỗi server',
        error: true,
      });
    }

  }
  else {
    return res.status(500).send({
      status: 500,
      message: 'lỗi server',
      error: true,
    });
  }
}

let updated = async (req, res, next) => {
  const { body, user } = req;

};

let deleted = async (req, res, next) => {
  const { body, user } = req;

};




module.exports = { getted, inserted, updated, deleted };