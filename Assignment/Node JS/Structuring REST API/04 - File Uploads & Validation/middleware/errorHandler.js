const multer = require("multer");

// Task 4: one place to turn upload errors into a simple JSON message
function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File is too large. Maximum size is 1MB.",
      });
    }

    return res.status(400).json({
      message: "Upload failed. Please try again.",
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }

  next();
}

module.exports = errorHandler;
