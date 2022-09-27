const db = require("../../models");
const { shops,managers } = db;


let getted = async (req, res, next) => {
  const { body, user } = req;

};

let inserted = async (req, res, next) => {
  const { body, user } = req;
  if (user) {
    try {
      const {id}=user;
      let manager = await managers.findOne({ where: {id_user:id}})
      let dataShops = await shops.create({ ...body,id_manager:manager.id })
      return res.status(200).send({
        status: 200,
        message: 'Tạo shop thành công',
        error: false,
        data: dataShops
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