const model = require('./../../models');
let { Key } = require('./../../key/keyJWT');
let getProduct = async (req, res, next) => {
  try {
    let data = await model.product.findAll({});
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
let createProduct = async (req, res, next) => {
  console.log(req.body);
  const { body } = req;
  try {
    let data = await model.product.create(body);
    return res.status(201).send({
      data,
      status: 201,
      message: 'created',
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
  for (i = 1; i < length; i++) {
    let Data = await model.product.findOne({ where: { english: body[i][1] } });
    if (!Data) {
      try {
        let data = await model.product.create({ vietnam: body[i][0], english: body[i][1] });
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

let update = async (req, res, next) => {
  console.log(req.params.id);
  model.product.findOne({ where: { id: req.params.id } })
    .then((product) => {
      if (!product) {
        return res.status(400).send({
          status: 400,
          message: 'Product not found',
          error: true
        })
      }
      console.log('sss', product);
      product.update({
        ...product, //spread out existing product
        ...req.body //spread out req.body - the differences in the body will override the product returned from DB.
      })
        .then((updatedproduct) => {
          return res.status(200).send({
            data: updatedproduct,
            status: 200,
            message: 'success',
            error: false
          });
        })
        .catch((error) => {
          return res.status(400).send({
            status: 400,
            message: 'No update',
            error: true
          })
        });
    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: 'No update',
        error: true
      })
    });
}
let updateImage = async (req, res, next) => {
  const { file } = req;
  if (!file) {
    return res.status(500).send({
      status: 500,
      message: 'No Upload File',
      error: true
    });
  } else {
    console.log(file.filename);
    var image = 'http://127.0.0.1:3001/' + file.filename;
    model.product.findOne({ where: { id: req.params.id } })
    .then((product) => {
      if (!product) {
        return res.status(400).send({
          status: 400,
          message: 'Product not found',
          error: true
        })
      }
      console.log('sss', product);
      product.update({
        ...product, //spread out existing product
        image //spread out req.body - the differences in the body will override the product returned from DB.
      })
        .then((updatedproduct) => {
          return res.status(200).send({
            data: updatedproduct,
            status: 200,
            message: 'success',
            error: false
          });
        })
        .catch((error) => {
          return res.status(400).send({
            status: 400,
            message: 'No update',
            error: true
          })
        });
    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: 'No update',
        error: true
      })
    });
  }
};

module.exports = { getProduct, createProduct, createMultiple, update, updateImage };