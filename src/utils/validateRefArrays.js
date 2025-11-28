import mongoose from "mongoose";
import { AppError } from "./AppError.js";

export const validateRefArray = async (Model, ids, fieldName) => {
  if (!Array.isArray(ids)) {
    throw new AppError(`'${fieldName}' must be an array`);
  }

  // Check all IDs are valid ObjectIds
  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(`Invalid ID format inside '${fieldName}'`);
    }
  }

  // Query DB for all IDs at once (faster)
  const count = await Model.countDocuments({ _id: { $in: ids } });

  if (count !== ids.length) {
    throw new AppError(`Invalid reference(s) in '${fieldName}', some IDs do not exist`,404);
  }

  return true;
};
