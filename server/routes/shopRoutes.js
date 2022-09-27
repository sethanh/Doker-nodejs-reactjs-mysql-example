let express = require("express");
let router = new express.Router();
let { shopController } = require('../controllers');
const { inserted }= shopController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth;


// router.get("",);
// router.get("/:id",);
router.post("",tokenAuth,inserted);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;