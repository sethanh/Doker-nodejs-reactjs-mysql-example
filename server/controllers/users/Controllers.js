var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { Key } = require('./../../key/keyJWT');
const db = require("../../models");
const { users, staffs, customers, admins, managers } = db;


let signIn = async (req, res, next) => {
  const { body, user } = req;
  const { password, type } = body;
  if (user) {
    if (type !== 'facebook' && type !== 'google') {
      const passwordHash = req.user.password;
      let data = bcrypt.compareSync(password, passwordHash);

      if (data) {
        var token = jwt.sign({ id: req.user.id }, Key, { expiresIn: '5h' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).send({
          token,
          status: 200,
          message: 'Đăng nhập thành công',
          error: false
        });
      }

      else return res.status(400).send({
        status: 400,
        message: 'Không tồn tại tài khoản',
        error: true
      })
    }

    else {
      var token = jwt.sign({ id: req.user.id }, Key, { expiresIn: '5h' });
      res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).send({
        token,
        status: 200,
        message: 'Đăng nhập thành công',
        error: false
      });
    }


  }
  else return res.status(400).send({
    status: 400,
    message: 'Không tồn tại tài khoản',
    error: true
  })
};

let signUp = async (req, res, next) => {
  const { password, ...body } = req.body;
  const { rule } = req.body;
  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);
  console.log(passwordHash)
  try {
    let data = await users.create({ ...body, password: passwordHash });
    switch(rule){
      case 'admin':
        let dataAdmin = await admins.create({ id_user: data.id,status:0 });
        break;
      case 'manager':
        let dataManager = await managers.create({ id_user: data.id,status:0});
        break;
      case 'customer':
        let dataCustomer = await customers.create({ id_user: data.id ,status:0,point:0});
      default:
        break;
    }
    var token = jwt.sign({ id: data.id }, Key, { expiresIn: '5h' });
    console.log(token)
    return res.status(200).send({
      token,
      status: 200,
      message: 'Đăng kí thành công',
      data: data,
      error: false
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 500,
      message: 'lỗi server',
      error: true,
    });
  }
};



module.exports = { signUp, signIn};