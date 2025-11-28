import crud from "./crudController.js";
import Company from "../models/companyModel.js"

const base = crud(Company);
export default {
    create: base.create,
    getOne:base.getOne,
    getAll:base.getAll,
    remove:base.remove
}