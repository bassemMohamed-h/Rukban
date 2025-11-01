import crudController from "./crudController.js";
import packages from "../models/packageModel.js";

const base = crudController.generate(packages)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}