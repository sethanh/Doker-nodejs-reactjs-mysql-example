const db = require("../../models");
const {
  invoices_requests, request_details, customers,
  staffs, shops, products, managers, users,
} = db;
const { sendOk, sendErr } = require('../../components');

let index = async (req, res, next) => {
  const { user } = req;
  const { id } = user;
  try {
    let customer = await customers.findOne({ where: { id_user: id } });
    let dataRequest = await invoices_requests.findAll({
      where: { id_customer: customer.id },
      include: [
        {
          model: request_details,
          include: [{
            model: products
          }]
        }
      ]
    })
    sendOk({
      res: res,
      data: dataRequest,
      message: 'Invoices requests',
      error: false,
      status: 200
    })
  } catch (err) {
    sendErr({
      res: res,
      message: JSON.stringify(err),
      status: 500
    })
  }
};

let indexConfirmRequest = async (req, res, next) => {
  const { user } = req;
  const { id } = user;
  try {
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

  } catch (err) {
    sendErr({
      res: res,
      message: JSON.stringify(err),
      status: 500
    })
  }
}

let create = async (req, res, next) => {
  const { user, body } = req;
  const { extra_data } = body;
  if (user) {
    try {
      const { id } = user;
      const customer = await customers.findOne({ where: { id_user: id } })
      let data = await invoices_requests.create({ ...body, id_customer: customer.id, status: 0 });
      let objectDetails = JSON.parse(extra_data);
      const lengthObj = objectDetails.length;
      for (let i = 0; i < lengthObj; i++) {
        await request_details.create({ ...objectDetails[i], id_invoices_request: data.id, status: 0 })
      }
      return sendOk({
        res,
        status: 200,
        message: 'Tạo thành công invoices Request',
        error: false,
        data,
        body
      });
    } catch (e) {
      console.error(e);
      return sendOk({
        res,
        status: 500,
        message: 'lỗi server',
        error: true,
      });
    }

  }
  else {
    return sendErr({
      res: res,
      message: JSON.stringify(err),
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




module.exports = { index, create, updated, destroy, show, indexConfirmRequest };