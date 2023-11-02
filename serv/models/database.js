const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connection established!");
  } catch (error) {
    console.log(error.message);
  }
};
