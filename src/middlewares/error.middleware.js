export default (err, req, res, next) => {
  console.error(err);

    // If the error is a trusted AppError (e.g., validation, missing field)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(400).json({
      success: false,
      message: `Duplicate value for '${field}': '${value}'. Please use a different ${field}.`
    });
  }

  // Handle validation errors (optional)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map(e => e.message).join(", ")
    });
  }

  // Handle Token Expire erorr
  if(err.name === "TokenExpiredError"){
    return res.status(401).json({
      success: false,
      message: "TokenExpiredError"
    })
  }

  // Handle Token Expire erorr
  if(err.name === "JsonWebTokenError"){
    return res.status(401).json({
      success: false,
      message: "JsonWebTokenError"
    })
  }
  // Default (generic) error
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later."
  });
};
