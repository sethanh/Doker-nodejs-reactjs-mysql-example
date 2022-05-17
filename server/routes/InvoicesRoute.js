let express = require("express");
let router = new express.Router();
let {getInvoicesRequest,createInvoicesRequest,createInvoices}= require('../controllers/invoices/Controllers')
router.get("/get_request",getInvoicesRequest);
router.post("/create_request",createInvoicesRequest);
router.post("/create",createInvoices);
module.exports = router;