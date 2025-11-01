import crudController from "./crudController.js";
import taskModel from "../models/taskModel.js";

const base = crudController.generate(taskModel)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}