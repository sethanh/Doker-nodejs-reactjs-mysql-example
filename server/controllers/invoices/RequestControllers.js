const db = require("../../models");
const { invoices_requests, request_details } = db;

let getted = async (req, res, next) => {
  const { body, user } = req;

};

let getConfirmRequest = async (req, res, next) => {
  const { user} = req;

}

let inserted = async (req, res, next) => {
  const { user, body } = req;
  const { extra_data } = body;
  if (user) {
    try {
      const { id } = user;
      let data = await invoices_requests.create({ ...body });
      let objectDetails = JSON.parse(extra_data);
      const lengthObj = objectDetails.length;
      for (let i = 0; i < lengthObj; i++) {
        await request_details.create({...objectDetails[i],id_invoices_request:data.id })
      }
      return res.status(200).send({
        status: 200,
        message: 'Tạo thành công invoices Request',
        error: false,
        data,
        body
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