const express = require("express");
const connectDB = require("./configs/connectDB");
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 3000;
require("dotenv").config();

connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route admin
app.use("/API/v1/admin", require("./routes/user"));

// page 404
app.use("/", (req, res) => {
  res.status(404).send("request failed");
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
