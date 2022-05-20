let express = require("express");
let router = new express.Router();
let {getProduct,createProduct,update,updateImage} = require('../controllers/product/Controllers');
let {upload} = require('./../controllers/users/Controllers');
router.get("/get",getProduct);
router.post("/create",createProduct);
router.put("/:id",update);
router.put("/image/:id",upload.single('profileImg'),updateImage);
module.exports = router;