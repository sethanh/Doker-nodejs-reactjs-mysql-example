let express = require("express");
let router = new express.Router();
let {get,create}= require('../controllers/carts/Controllers');
let {CheckHeaders } = require('./../middlewares/index');
router.get("/",CheckHeaders,get);
router.post("/",CheckHeaders,create);
module.exports = router;