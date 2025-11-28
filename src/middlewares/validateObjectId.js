import mongoose from "mongoose";

// Middleware factory — reusable for any param name (like :id, :employeeId, etc.)
export default (id) => (req, res, next) => {    
    if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${id} format`
      });
    }

    next();
};
