exports.sendToken = (user, user_role, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);
  res.cookie("user_role", user_role, options);

  res.status(statusCode).json({ success: true, user, token });
};
