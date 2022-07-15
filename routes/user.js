const router = require("express").Router();

const {
  handleSignup,
  handleSignin,
  handleActive,
  handleForgetPassword
} = require("../controllers/userController");

router.post("/signup", handleSignup);
router.post("/active", handleActive);
router.post("/signin", handleSignin);
router.post("/forget-password", handleForgetPassword);

module.exports = router;
