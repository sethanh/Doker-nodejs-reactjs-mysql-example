let express = require("express");
let router = new express.Router();
let { unitController } = require('../controllers');
const { inserted }= unitController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("",);
// router.get("/:id",);
router.post("",tokenAuth,inserted);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;