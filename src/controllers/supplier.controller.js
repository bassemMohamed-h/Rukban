import crud from "./crudController.js";
import supplierModel from "../models/supplierModel.js";
import departmentModel from "../models/departmentModel.js";
import materialModel from "../models/materialModel.js";

const base = crud(supplierModel, "supplierId", {
    getPopulate:[
        {path:"department", select:"name"},
        {path:"materials",  select:"name"}
    ],
    checkRef:       [{ModelCheck:departmentModel,   idToCheck:"department"}],
    checkRefsArray: [{ModelCheck:materialModel,     idToCheck:"materials"}],
    restrictDelete: [{ModelCheck:materialModel,     idToDelete:"supplier"}]
})

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    update:base.update
}