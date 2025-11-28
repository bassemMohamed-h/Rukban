import crud from "./crudController.js";
import project from "../models/projectModel.js";
import clientModel from "../models/clientModel.js";
import departmentModel from "../models/departmentModel.js";
import packageModel from "../models/packageModel.js";

const base = crud(project,"projectId",{
    getPopulate:[
        {path:"client",     select:"name"},
        {path:"department", select:"name"},
        {path:"package",    select:"name"},
    ],
    checkRef:[
        {ModelCheck:clientModel,        idToCheck:"client"},
        {ModelCheck:departmentModel,    idToCheck:"department"},
        {ModelCheck:packageModel,       idToCheck:"package"}
    ]
})

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    update: base.update
}