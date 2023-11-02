exports.generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.log(err.stack);

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    stack: err.stack,
  });
};
