const User = require("./../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register new user
// @route   POST  /API/v1/user/signup
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

const generateToken = (key) => {
  return jwt.sign({ key }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
