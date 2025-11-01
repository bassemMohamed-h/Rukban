import crudController from "./crudController.js";
import teamModel from "../models/teamModel.js";
const base = crudController.generate(teamModel);

export default{
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    updateArrays:base.updateArrays
}