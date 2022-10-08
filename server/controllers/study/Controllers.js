dbstudy = require('../../models/studyModel');
let { Key } = require('./../../key/keyJWT');
let getStudy = async (req, res, next) => {
  let data = await dbstudy.Studys.findAll({});
  return res.status(200).send({
    status: 200,
    message: 'success',
    data,
    error: false
  });
};
let createStudy = async (req, res, next) => {
  console.log(req.body);
  const { vietnam, english } = req.body;
  try {
    let data = await dbstudy.Studys.create({ vietnam, english });
    return res.status(201).send({
      data,
      status: 201,
      message: 'Đăng nhập thành công',
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
let createMultiple = async (req, res, next) => {
  const { body } = req;
  let length = body.length;
  console.log('DAY');
  for (i = 1; i < length; i++) {
    let Data = await dbstudy.Studys.findOne({ where: { english: body[i][1] } });
    if (!Data) {
      try {
        let data = await dbstudy.Studys.create({vietnam: body[i][0], english: body[i][1] });
      } catch (error) {
      }
    }
  }
  return res.status(201).send({
    status: 201,
    message: 'succes',
    error: false
  });
};

module.exports = { getStudy, createStudy, createMultiple };