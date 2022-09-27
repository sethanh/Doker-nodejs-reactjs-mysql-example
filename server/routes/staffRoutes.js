let express = require("express");
let router = new express.Router();
let { staffController } = require('../controllers');
const { inserted }= staffController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("",);
// router.get("/:id",);
router.post("",tokenAuth,inserted);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;