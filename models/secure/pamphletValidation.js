const yup = require("yup");

exports.schema = yup.object().shape({
  title: yup.string().required("وارد کردن عنوان اجباری است"),
  description: yup.string(),
  tags: yup.string(),
  //   .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
});
