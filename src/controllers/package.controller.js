import crud from "./crudController.js";
import packageModel from "../models/packageModel.js";
import serviceModel from "../models/serviceModel.js";

const base = crud(packageModel,"packageId",{
    getPopulate:[{path:"services", select:"name"}],
    checkRefsArray:[{ModelCheck:serviceModel, idToCheck:"services"}],
    restrictDelete:[{ModelCheck:serviceModel, idToDelete:"services"}]
})

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
}