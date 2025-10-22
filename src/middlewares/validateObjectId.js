const mongoose = require("mongoose");

// Middleware factory — reusable for any param name (like :id, :employeeId, etc.)
module.exports = (req, res, next) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${id} format`
      });
    }

    next();
};
