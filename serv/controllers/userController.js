const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) res.status(404).json({ message: "No user found!" });
  res.status(200).json({ user_role: "user", user });
});

exports.signInUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user)
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );

  const isMatch = user.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

  sendToken(user, "user", 200, res);
});

exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("user_role");
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signed out!!!" });
});
