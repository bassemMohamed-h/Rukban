import roleModel from "../models/roleModel.js";
import { AppError } from "../utils/AppError.js";

const allowedPermissions = ["read", "write", "remove", "add"];

// when add || update permission in role model check if it allowedPermission
const validatePermissions = (req, res, next) => {
  const { permissions } = req.body;
  if(!permissions) return next();
  
  if (!Array.isArray(permissions)) throw new AppError("permissions must be array",400)
  for(const obj of permissions){
    if(!req.method==="Post"){
      if(!obj.values || !obj.action) throw new AppError("values and action needed",400);
      if(!Array.isArray(obj.values)) throw new AppError("values must be array",400);
      const invalid = obj.values.filter(p => !allowedPermissions.includes(p));
      if (invalid.length > 0) throw new AppError("Invalid permissions.",400)
    }
  }
  next();
};
// when add || update role of employee check if it exist in database
const validateRoles = async (req, res, next) =>{
  const { roles } = req.body;   
  try {
    // If no roles provided, skip validation
    if(!roles) return next();
    for(const obj of roles){
      if (!obj.values || !Array.isArray(obj.values)) {
      return res.status(400).json({message:("roles must have array of values")});
      }
      if(!obj.action) res.status(400).json({message:'the action needed'})
      // Extract role names user sent
      const requestedRoles = obj.values;
      // Find roles that exist in DB
      const validRoles = await roleModel.find({ name: { $in: requestedRoles } }).distinct("name");
      // Find invalid ones
      const invalidRoles = requestedRoles.filter(r => !validRoles.includes(r));
      if (invalidRoles.length > 0) {
        return res.status(400).json({
          message: `Invalid roles.`
        });
    }
    }
    
    
    // Everything is valid — continue to controller
    next();
  } catch (err) {
    next(err);
  }
}
export {validatePermissions,validateRoles}