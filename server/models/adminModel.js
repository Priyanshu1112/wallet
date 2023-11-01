const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminModel = new mongoose.Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: {
    type: "string",
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: "string",
    select: false,
    required: true,
    maxLength: [15, "Password should not exceed more than 15 characters"],
    minLength: [6, "Password should have atleast 6 characters"],
  },
});

adminModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

adminModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

adminModel.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Admin = mongoose.model("Admin", adminModel);

module.exports = Admin;
