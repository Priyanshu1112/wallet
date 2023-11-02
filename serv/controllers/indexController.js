const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

exports.current = catchAsyncErrors(async (req, res, next) => {
  const { user_role } = req.cookies;
  if (user_role == "admin") {
    res.redirect("/admin");
  } else if (user_role == "user") {
    res.redirect("/user");
  }
});
