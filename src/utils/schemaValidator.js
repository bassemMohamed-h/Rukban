import { AppError } from "./AppError.js";

// utils/schemaValidator.js
export function validateSchemaKeys(schema, data) {
    const schemaPaths = schema.paths;
    const schemaKeys = Object.keys(schemaPaths);
    const dataKeys = Object.keys(data);
    
    
  // find keys that don't exist in the schema
  const invalidKeys = dataKeys.filter(key => !schemaKeys.includes(key));
  if (invalidKeys.length > 0) {
    throw new AppError(
      `Invalid keys detected: ${invalidKeys.join(", ")}. Data does not match schema.`
    );
  }

  // optional: type check
  for (const key of dataKeys) {
    //console.log(`data[key]:${typeof(data[key])}, schemaPaths[key]:${schemaPaths[key].instance}, `);
    if (schemaPaths[key].instance === "Array" && !Array.isArray(data[key])) {
      throw new AppError(`Invalid type for ${key}. Expected array.`,400);
    }
    if (schemaPaths[key].instance === "String" && typeof data[key] !== "string") {
      throw new AppError(`Invalid type for ${key}. Expected string.`,400);
    }
    if (schemaPaths[key].instance === "Boolean" && typeof data[key] !== "boolean") {
      throw new AppError(`Invalid type for ${key}. Expected Boolean.`,400);
    }
  }

  // optional: check required fields (if you want)
  for (const key of dataKeys) {
        //console.log(schemaPaths[key].options.required);
        if (schemaPaths[key].options.required){
            if(data[key] == null || data[key]==""){
                throw new AppError(`Missing required field: ${key}`);
            }
        }
    }

  return true;
}
