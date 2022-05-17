let express = require("express");
let router = new express.Router();
let {getSubject,createSubject,createMultiple,getSelectSubject} = require('./../controllers/subject/Controllers');
router.get("/get",getSubject);
router.post("/create",createSubject);
router.post("/createmultiple",createMultiple);
router.post("/getselect",getSelectSubject);
module.exports = router;