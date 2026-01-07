const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DbConnection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`db connected to ${process.env.MONGO_URL}`))
  .catch((err) => console.error(err));

module.exports = DbConnection;
