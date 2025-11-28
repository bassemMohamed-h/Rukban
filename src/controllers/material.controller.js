import crud from "./crudController.js"
import Material from "../models/materialModel.js"
import supplierModel from "../models/supplierModel.js"
import serviceModel from "../models/serviceModel.js"

const base = crud(Material, "materialId", {
    getPopulate:[
        {path:"supplier", select:"name"},
        {path:"services", select:"name"},
    ],
    checkRef:       [{ModelCheck:supplierModel, idToCheck:"supplier"}],
    checkRefsArray: [{ModelCheck:serviceModel,  idToCheck:"services"}],
    restrictDelete: [{ModelCheck:serviceModel,  idToDelete:"services"}]
})
export default{
    create:base.create,
    remove:base.remove,
    getAll:base.getAll,
    getOne:base.getOne,
    update:base.update
}