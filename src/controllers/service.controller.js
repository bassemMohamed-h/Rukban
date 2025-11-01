import crudController from "./crudController.js";
import serviceModel from "../models/serviceModel.js";

const base = crudController.generate(serviceModel)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}