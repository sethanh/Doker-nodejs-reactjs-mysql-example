let express = require("express");
let router = new express.Router();
let { isEmail, CheckAccount, CheckHeaders } = require('./../middlewares/index');
let { signUp, logIn, tokenLogin, updateAvatar,upload,facebookLogin,getUser,update } = require('./../controllers/users/Controllers');

router.post("/users", isEmail, signUp);
router.post("/users/login", CheckAccount, logIn);
router.get("/users/tokenlogin",CheckHeaders, tokenLogin);
router.post("/users/facebooklogin",facebookLogin);
router.get("/users/get", CheckHeaders, getUser);
router.post("/users/update/avatar",CheckHeaders ,upload.single('profileImg'), updateAvatar);
router.put("/users/",CheckHeaders,update);

module.exports = router;