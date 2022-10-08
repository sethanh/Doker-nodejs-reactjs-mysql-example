let express = require("express");
let router = new express.Router();
let { InvoicesRequestController} = require('../controllers');
const { create: createRequest,indexConfirmRequest, index:indexRequest }= InvoicesRequestController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("",);
// router.get("/:id",);
//router.post("",tokenAuth,requestcreate);
// router.put("/:id",);
// router.delete("/:id",);

router.get("/request",tokenAuth,indexRequest);
router.get("/request/confirm",tokenAuth,indexConfirmRequest);
// router.get("/request/:id",);
router.post("/request",tokenAuth,createRequest);

module.exports = router;