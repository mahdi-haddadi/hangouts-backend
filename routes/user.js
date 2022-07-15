const router = require("express").Router();

const {
  handleSignup,
  handleSignin,
  handleActive,
} = require("../controllers/userController");

router.post("/signup", handleSignup);
router.post("/active", handleActive);
router.post("/signin", handleSignin);

module.exports = router;
