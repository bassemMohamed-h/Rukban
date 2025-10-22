import mongoose from "mongoose";
import { AppError } from "./AppError.js";

export async function updateArrays(model, id, updateData) {
  const doc = await model.findById(id);
  if (!doc) throw new AppError(`The ${model.modelName} with id ${id} does not exist`,400);

  // 1️⃣ Detect array fields from the schema
  const arrayFields = Object.keys(model.schema.paths).filter(
    (path) => model.schema.paths[path].instance === "Array"
  );  

  // 2️⃣ Loop through every key/value from request body
  for (const [key, value] of Object.entries(updateData)) {
    // if the request ask to update array in schema  
    if (arrayFields.includes(key)) {
      if(!Array.isArray(value)) throw new AppError("the Values must be an array",400)
      // featch the array
      for(const obj of value){
        //with no action 
      if (!obj || !obj.action) throw new AppError(`Must specify 'action' for array field '${key}'`,400);
      const { action, values } = obj;
      //check if the values are array
      if(!Array.isArray(values)) throw new AppError("the Values must be an array",400)
        // check if the array not intialized (if not inialized it)
      const currentArray = Array.isArray(doc[key]) ? [...doc[key]] : [];

      // 3️⃣ Detect if the array holds ObjectIds
      const schemaPath = model.schema.paths[key];
      const isObjectIdArray =
        schemaPath.instance === "Array" &&
        schemaPath.$embeddedSchemaType?.instance === "ObjectID";
        
      // 4️⃣ Convert plain strings to ObjectIds if needed
      let newValues = values;
      if (isObjectIdArray) {
        newValues = values.map((v) =>
              mongoose.Types.ObjectId.isValid(v)
                ? new mongoose.Types.ObjectId(v)
                : v
            )

      }
      // 5️⃣ Apply the requested action dynamically
      switch (action.toLowerCase()) {
        case "add":
          obj.values.forEach(v => {
            if (!currentArray.includes(v)) currentArray.push(v);
          });
          doc[key] = currentArray;
          break;

        case "remove":
          doc[key] = currentArray.filter(v => !obj.values.includes(v));
          break;

        case "replace":
          doc[key] = obj.values;
          break;
        default:
          throw new AppError(`Invalid action '${action}' for field '${key}'`,400);
      }
      }
    } else {
      // 6️⃣ Not an array field → just assign directly
      doc[key] = updateData[key];
    }
  }

await model.findByIdAndUpdate(id, doc, { new: true, runValidators: true });
  return doc;
}
