import crudController from "./crudController.js";
import subTeamModel from "../models/subTeamModel.js";

const base = crudController.generate(subTeamModel)

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays: base.updateArrays
}