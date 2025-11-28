import crud from "./crudController.js"
import ownerModel from "../models/ownerModel.js"

const base = crud(ownerModel);

export default {
    create:base.create,
    remove:base.remove,
    getOne:base.getOne,
    getAll:base.getAll,
    update:base.update
}