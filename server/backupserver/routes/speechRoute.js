let express = require("express");
let router = new express.Router();
let {quickStart} = require('../controllers/speech/index');
router.post("/get",quickStart);
module.exports = router;