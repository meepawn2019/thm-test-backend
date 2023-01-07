const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
