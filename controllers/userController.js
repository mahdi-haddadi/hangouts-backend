const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register new admin
// @route   POST  /API/v1/admin/signup
// @access  public
exports.handleSignup = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;

    // user validation
    await User.userValidation(req.body);

    // check user already exist
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ msg: "این کاربر در سیستم قبلا ثبت شده است" });
      // throw new Error("این کاربر در سیستم قبلا ثبت شده است");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullname,
      username,
      password: hashPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        active: user.active,
        token: generateToken(user.username),
      });
    } else {
      return res.status(400).json({ msg: "invalid user data" });
      // throw new Error("invalid user data");
    }
  } catch (error) {
    const errors = [];
    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        errors: e.errors,
      });
    });
    return res.status(400).json({ msg: errors });
  }
};

// @desc    active admin
// @route   POST  /API/v1/admin/active
// @access  public
exports.handleActive = async (req, res) => {
  try {
    const { code, username } = req.body;
    const user = await User.findOne({ username });
    // check exist user
    if (!user) res.status(400).json({ msg: "user not exist", success: false });
    // check active user
    if (user.active)
      res.status(400).json({ msg: "user is active", success: false });
    // check to be right code
    if (code !== "123456")
      res.status(400).json({ msg: "code is false", success: false });

    //   active user
    await User.updateOne({ username }, { $set: { active: true } });
    return res.status(200).json({ msg: "activated", success: true });

  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};

const generateToken = (key) => {
  return jwt.sign({ key }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
