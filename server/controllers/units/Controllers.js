const db = require("../../models");
const { units } = db;

let getted = async (req, res, next) => {
  const { body, user } = req;

};

let inserted = async (req, res, next) => {
  const { user,body } = req;
  if (user) {
    try {
      const {id}=user;
      const data = await units.create({...body,created_by:id});
      return res.status(200).send({
        status: 200,
        message: 'Tạo thành công unit',
        error: false,
        data
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
      message: 'Lỗi xác thực',
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