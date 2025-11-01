import crudController from "./crudController.js";
import supplierModel from "../models/supplierModel.js";

const base = crudController.generate(supplierModel)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}