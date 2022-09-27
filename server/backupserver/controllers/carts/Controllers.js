const model = require('./../../models');
let { Key } = require('./../../key/keyJWT');

let get = async (req, res, next) => {
  const { user } = req;
  try {
    let data = await model.cart.findAll({
      where: {
        id_customer: user.id
      },
      include: [
        { model: model.product, require: 'true' }
      ]
    });
    return res.status(200).send({
      status: 200,
      message: 'success',
      data,
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
let create = async (req, res, next) => {
  console.log(req.body);
  const { user } = req;
  const { id_product, quantify } = req.body;
  model.cart.findOne({ where: { id_product } })
    .then((cart) => {
      if (!cart) {
        try {
          model.cart.create({ id_customer: user.id, id_product, quantify }).then(() => {
            get(req, res, next);
          })
        } catch (error) {
          return res.status(500).send({
            status: 500,
            message: 'lỗi server',
            error: true
          });
        }
      }
      else {
        cart.update({
          ...cart, //spread out existing product
          quantify: cart.quantify + 1 //spread out req.body - the differences in the body will override the product returned from DB.
        })
          .then(() => {
            get(req, res, next);
          })
          .catch((error) => {
            return res.status(400).send({
              status: 400,
              message: 'No update',
              error: true
            })
          });
      }

    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: 'No update',
        error: true
      })
    });
};

module.exports = { get, create };