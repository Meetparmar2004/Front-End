function errorHandler(err, req, res, next) {
  console.log(err.message);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Something went wrong",
  });
}

module.exports = errorHandler;
