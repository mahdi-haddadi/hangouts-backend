const router = require("express").Router();

const {
  handleSignup,
  handleSignin,
  handleActive,
  handleForgetPassword,
  checkCodeSetPassword,
  setNewPassword,
} = require("../controllers/userController");

router.post("/signup", handleSignup);
router.post("/active", handleActive);
router.post("/signin", handleSignin);
router.post("/forget-password", handleForgetPassword);
router.post("/check-code-set-password", checkCodeSetPassword);
router.post("/set-new-password", setNewPassword);

module.exports = router;
