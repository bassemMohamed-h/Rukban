import crudController from "./crudController.js";
import project from "../models/projectModel.js";

const base = crudController.generate(project)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}