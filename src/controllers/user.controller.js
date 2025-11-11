import crudController from "./crudController.js";
import userModel from "../models/userModel.js";

const base = crudController.generate(userModel);

export default{
    create:base.create,
    remove:base.remove,
    update:base.update,
    getOne:base.getOne,
    getAll:base.getAll
}