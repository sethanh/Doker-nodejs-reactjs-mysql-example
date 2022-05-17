let express = require("express");
let router = new express.Router();
let {getProduct,createProduct,update} = require('../controllers/product/Controllers')
router.get("/get",getProduct);
router.post("/create",createProduct);
router.put("/:id",update);
module.exports = router;