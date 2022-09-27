let express = require("express");
let router = new express.Router();
let { InvoicesRequestController} = require('../controllers');
const { inserted: requestInserted }= InvoicesRequestController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("",);
// router.get("/:id",);
//router.post("",tokenAuth,requestInserted);
// router.put("/:id",);
// router.delete("/:id",);

//router.get("/request",);
// router.get("/request/:id",);
router.post("/request",tokenAuth,requestInserted);

module.exports = router;