import crud from "./crudController.js";
import Company from "../models/companyModel.js"

const base = crud.generate(Company);
export default {
    create: base.create,
    getOne:base.getOne,
    getAll:base.getAll,
    updateArrays:base.updateArrays,
    remove:base.remove
}