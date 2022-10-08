dbsubject = require('../../models/subjectModel');
let { Key } = require('./../../key/keyJWT');

let getSelectSubject = async (req, res, next) => {
  const sl = req.body;
  let data = await dbsubject.Subjects.findAll({ where: {subject: sl.subject }});
  console.log('sss',data);
  const group=['subject'];
  const query={group}
  let sj= await dbsubject.Subjects.findAndCountAll(query);
  console.log(sj);
  return res.status(200).send({
    status: 200,
    message: 'success',
    data:data||[],
    subject:sj,
    error: false
  });
};
let getSubject = async (req, res, next) => {
  let data = await dbsubject.Subjects.findAll({});
  const group=['subject'];
  const query={group}
  let sj= await dbsubject.Subjects.findAndCountAll(query);
  return res.status(200).send({
    status: 200,
    message: 'success',
    data,
    subject:sj,
    error: false
  });
};
let createSubject = async (req, res, next) => {
  console.log(req.body);
  const { vietnam, english } = req.body;
  try {
    let data = await dbsubject.Subjects.create({ vietnam, english });
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
  let sj= body[0][0];
  for (i = 1; i < length; i++) {
    let Data = await dbsubject.Subjects.findOne({ where: { english: body[i][1],subject:sj } });
    if (!Data) {
      try {
        let data = await dbsubject.Subjects.create({subject:sj,vietnam: body[i][0], english: body[i][1] });
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

module.exports = { getSubject, createSubject, createMultiple, getSelectSubject };