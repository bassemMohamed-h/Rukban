import mongoose from "mongoose";
import { AppError } from "./AppError.js";

export const validateRef = async (Model, id, fieldName) => {
  if(!mongoose.Types.ObjectId.isValid(id))
    throw new AppError(`Invalid ID format ${fieldName}` ,400)
  const exists = await Model.exists({_id:id})
  if (!exists) {
    throw new AppError(`Invalid '${fieldName}', reference does not exist`,400)
  }
  return true;
};