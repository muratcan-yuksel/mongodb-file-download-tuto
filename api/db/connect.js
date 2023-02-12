const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose.connect(url, {}, console.log("connected to mongodb atlas"));
};

module.exports = connectDB;
