const mongoose = require("mongoose");
const { schema } = require("./secure/userValidation");
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "please enter fullname"],
    },
    username: {
      // email or phone number
      type: String,
      required: [true, "please enter username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      minlength: [6, "password must be more than 6 chracter"],
    },
    active:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
