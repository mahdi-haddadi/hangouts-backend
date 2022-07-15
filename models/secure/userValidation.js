const yup = require("yup");

exports.schema = yup.object().shape({
  fullname: yup.string().trim().required("نام کامل خود را وارد کنید"),
  username: yup.string().trim().required("نام کاربری را وارد کنید"),
  password: yup
    .string()
    .trim()
    .min(6, "رمز عبور نباید کمتر از 6 کاراکتر باشد")
    .required("رمز عبور را وارد کنید"),
  passwordConfirm: yup
    .string()
    .trim()
    .required("تکرار رمز عبور را وارد کنید")
    .oneOf([yup.ref("password"), null], "رمز عبور با تکرار آن برابر نیست"),
});
