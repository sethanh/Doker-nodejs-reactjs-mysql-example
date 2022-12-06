let express = require("express");
let router = new express.Router();
let { userController } = require('../controllers');
const { signIn, signUp, index ,signInByToken }= userController;
let {Auth} = require('../middlewares');
const {accountAuth,tokenAuth}= Auth


router.get("",tokenAuth,index);
// router.get("/:id",);
router.post("",signUp);
router.post("/signIn",accountAuth,signIn);
router.get("/signIn",tokenAuth,signInByToken);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;