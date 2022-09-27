const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './public/';
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const path = require('path');
let { Key } = require('./../../key/keyJWT');
var mysql = require('mysql');
var options = require('../../config/database');
var con = mysql.createConnection(options);
const model = require('../../models');

let signUp = async (req, res, next) => {
  const { password, ...body } = req.body;
  const { name, rule } = req.body;
  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);
  try {
    let data = await model.user.create({ ...body, password: passwordHash });
    if (rule) {
      let dataStaff = await model.staff.create({ id_user: data.id });
    }
    else {
      let dataCustomer = await model.customer.create({ id_user: data.id });
    }
    console.log(data);
    var token = jwt.sign({ id: data.id, name: data.name, rule: data.rule || 'customer' }, Key, { expiresIn: '5h' });
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).send({
      data: { name, rule: data.rule || 'customer' },
      token,
      status: 200,
      message: 'Đăng kí thành công',
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

let logIn = async (req, res, next) => {
  const { password } = req.body;
  const passwordHash = req.user.password;
  let data = bcrypt.compareSync(password, passwordHash);
  if (data) {
    const { name, rule } = req.user;
    var token = jwt.sign({ id: req.user.id, name: req.user.name, rule: req.user.rule }, Key, { expiresIn: '5h' });
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).send({
      token,
      data: { name, rule },
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
};

let tokenLogin = async (req, res, next) => {
  const { user } = req;
  try {
    var token = jwt.sign({ id: user.id, name: user.name, rule: user.rule }, Key, { expiresIn: '5h' });
    const { name, rule } = user;
    return res.status(200).send({
      data: { name, rule },
      token,
      status: 200,
      message: 'Đăng nhập thành công',
      error: false
    });
  }
  catch (error) {
    return res.status(400).send({
      status: 400,
      message: 'Không tồn tại tài khoản',
      error: true
    })
  }
};

let updateAvatar = async (req, res, next) => {
  const { file, user } = req;
  const { rule, id } = user;
  if (!file) {
    return res.status(500).send({
      status: 500,
      message: 'No Upload File',
      error: true
    });
  } else {
    console.log(file.filename);
    var image = 'http://127.0.0.1:3001/' + file.filename;
    user.update({
      ...user,
      image
    })
      .then(() => {
        if (rule === 'customer') {
          model.customer.findOne({
            where: {
              id_user: id
            },
            include: [
              { model: model.user, require: 'true' }
            ]
          }).then((post) => {
            return res.status(200).send({
              data: post,
              status: 200,
              message: 'success',
              error: false
            });
          })
        }
        else {
          //staff
        }
      })
      .catch((error) => {
        return res.status(400).send({
          status: 400,
          message: 'không thể update avatar',
          error: true
        });
      });
  }
};

let facebookLogin = async (req, res, next) => {
  const { body } = req;
  const { id_facebook, name } = body;
  let Data = await model.customer.findOne({ where: { id_facebook } });
  if (Data) {
    let user = await model.user.findOne({ where: { id: Data.id_user } });
    var token = jwt.sign({ id: user.id, name: user.name, rule: user.rule || 'customer' }, Key, { expiresIn: '5h' });
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).send({
      token,
      data: { name: user.name, rule: user.rule || 'customer' },
      status: 200,
      message: 'Đăng nhập thành công',
      error: false
    });
  }
  else {
    let salt = bcrypt.genSaltSync(saltRounds);
    let passwordHash = bcrypt.hashSync('123456', salt);
    try {
      let data = await model.user.create({ name, password: passwordHash });
      let dataCustomer = await model.customer.create({ id_user: data.id, id_facebook });
      console.log(data);
      var token = jwt.sign({ id: data.id, name: data.name, rule: data.rule || 'customer' }, Key, { expiresIn: '5h' });
      res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).send({
        data: { name, rule: data.rule || 'customer' },
        token,
        status: 200,
        message: 'Đăng kí thành công',
        error: false
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'lỗi server',
        error: true
      });
    }
  }
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
let getUser = async (req, res, next) => {
  try {
    const { user } = req;
    const { rule, id } = user;
    if (rule === 'customer') {
      model.customer.findOne({
        where: {
          id_user: id
        },
        include: [
          { model: model.user, require: 'true' }
        ]
      }).then((post) => {
        return res.status(200).send({
          data: post,
          status: 200,
          message: 'success',
          error: false
        });
      })
    }
    else {
    }
  }
  catch (error) {
    return res.status(400).send({
      status: 400,
      message: 'No data',
      error: true
    })
  }
};
let update = async (req, res, next) => {
  const { user } = req;
  const { rule, id } = user;
  user.update({
    ...user,
    ...req.body
  })
    .then(() => {
      if (rule === 'customer') {
        model.customer.findOne({
          where: {
            id_user: id
          },
          include: [
            { model: model.user, require: 'true' }
          ]
        }).then((post) => {
          return res.status(200).send({
            data: post,
            status: 200,
            message: 'success',
            error: false
          });
        })
      }
      else {
        //staff
      }
    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: 'không thể update user',
        error: true
      });
    });
}


module.exports = { signUp, logIn, tokenLogin, updateAvatar, upload, facebookLogin, getUser, update };