let express = require("express");
let router = new express.Router();
let { userController } = require('../controllers');
const { signIn, signUp }= userController;
let {Auth} = require('../middlewares');
const {accountAuth}= Auth


// router.get("",);
// router.get("/:id",);
router.post("",signUp);
router.post("/signIn",accountAuth,signIn);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;