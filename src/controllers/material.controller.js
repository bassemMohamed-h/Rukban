import crud from "./crudController.js"
import Material from "../models/materialModel.js"

const base = crud.generate(Material)
export default{
    create:base.create,
    remove:base.remove,
    getAll:base.getAll,
    getOne:base.getOne,
    updateArrays:base.updateArrays
}