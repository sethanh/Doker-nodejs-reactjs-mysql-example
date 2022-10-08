let express = require("express");
let router = new express.Router();
let { productController } = require('../controllers');
const { create }= productController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("",);
// router.get("/:id",);
router.post("",tokenAuth,create);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;