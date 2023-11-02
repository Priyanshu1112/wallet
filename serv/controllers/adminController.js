const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");

// ADMIN

exports.currentAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.id);
  if (!admin) {
    res.status(404).json({ message: "No Admin found!" });
  }
  res.status(200).json({ user_role: "admin", admin });
});

exports.signUpAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await new Admin(req.body).save();
  res.status(200).json({ message: "Admin signed up successfully!", admin });
});

// exports.allAdmins = catchAsyncErrors(async (req, res, next) => {});

// exports.addAdmin = catchAsyncErrors(async (req, res, next) => {
//   const admin = await new Admin(req.body).save();
//   res.status(200).json({ message: "Admin added successfully!", admin });
// });

exports.updateAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ message: "Admin updated successfully!", admin });
});

// exports.deleteAdmin = catchAsyncErrors(async (req, res, next) => {
//   const admin = await Admin.findByIdAndDelete(req.paras.id);

// });

exports.signInAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!admin) {
    return next(
      new ErrorHandler("Admin not found with this email address", 404)
    );
  }

  const isMatch = admin.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

  sendToken(admin, "admin", 200, res);
});

exports.logOutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("user_role");
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signed out!!!" });
});

exports.changePasswordAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.id).exec();

  admin.password = req.body.password;
  await admin.save();
  res.status(200).json({ message: "Password changed successfully!!!" });
});

// USERS

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.addUser = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  res.status(200).json({ message: "User added successfully!", user });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user)
    res.status(200).json({ message: "User deleted successfully!", user });
  else res.status(404).json({ message: "Cannot delete user!" });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ message: "User updated successfully!", user });
});
