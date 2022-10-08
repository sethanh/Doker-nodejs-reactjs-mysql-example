let express = require("express");
let router = new express.Router();
let {getStudy,createStudy,createMultiple} = require('../controllers/study/Controllers');
router.get("/get",getStudy);
router.post("/create",createStudy);
router.post("/createmultiple",createMultiple);
module.exports = router;