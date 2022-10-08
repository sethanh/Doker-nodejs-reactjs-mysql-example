let { sendOk, sendErr } = require('./../../components')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { Key } = require('./../../key/keyJWT');
const db = require("../../models");
const { users, staffs, customers, admins, managers, invoices_requests, products, shops, request_details } = db;

let index = async (req, res) => {
  const { user } = req;
  const { id } = user;

  let data = await users.findOne({
    where: { id },
    include: [
      {
        model: staffs,
        include: [
          {
            model: shops,
            include: [
              {
                model: products,
                include: [
                  {
                    where: { status: 0 },
                    model: request_details,
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        model: managers,
        include: [
          {
            model: shops,
            include: [
              {
                model: products,
                include: [
                  {
                    model: request_details
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });
  const { Staffs } = data;
  const { Shop } = Staffs[0];
  const { Products } = Shop;
  const lengthProducts = Products.length;
  let queryRequest = []
  for (let i = 0; i < lengthProducts; i++) {
    queryRequest.push(Products[i].id)
  }

  let dataRequest = await invoices_requests.findAll({
    include: [
      {
        where: { id_product: queryRequest },
        model: request_details,
        include: [{
          model: products
        }]
      }
    ]
  })

  sendOk({
    res,
    status: 200,
    data: dataRequest,
    error: false
  })
}


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
        return sendOk({
          res,
          token,
          status: 200,
          message: 'Đăng nhập thành công',
          error: false
        })
      }

      else return sendErr({
        res: res,
        message: 'Không tồn tại tài khoản',
        status: 400
      })
    }

    else {
      var token = jwt.sign({ id: req.user.id }, Key, { expiresIn: '5h' });
      res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
      return sendOk({
        res,
        token,
        status: 200,
        message: 'Đăng nhập thành công',
        error: false
      });
    }


  }
  else return sendErr({
    res: res,
    message: 'Không tồn tại tài khoản',
    status: 500
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
    switch (rule) {
      case 'admin':
        let dataAdmin = await admins.create({ id_user: data.id, status: 0 });
        break;
      case 'manager':
        let dataManager = await managers.create({ id_user: data.id, status: 0 });
        break;
      case 'customer':
        let dataCustomer = await customers.create({ id_user: data.id, status: 0, point: 0 });
      default:
        break;
    }
    var token = jwt.sign({ id: data.id }, Key, { expiresIn: '5h' });
    console.log(token)
    return sendOk({
      res,
      token,
      status: 200,
      message: 'Đăng kí thành công',
      data: data,
      error: false
    });
  } catch (err) {
    return sendErr({
      res: res,
      message: JSON.stringify(err),
      status: 500
    })
  }
};
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



module.exports = { signUp, signIn, index, show, updated, destroy };