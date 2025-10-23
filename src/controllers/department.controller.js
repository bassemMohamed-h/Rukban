import crud from "./crudController.js"
import Department from "../models/departmentModel.js"

const base = crud.generate(Department);
export default{
    create : base.create,
    getAll : base.getAll,
    getOne : base.getOne,
    updateArrays:base.updateArrays,
    remove : base.remove
}