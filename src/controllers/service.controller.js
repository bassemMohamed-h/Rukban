import crud from "./crudController.js";
import serviceModel from "../models/serviceModel.js";
import taskModel from "../models/taskModel.js";
import materialModel from "../models/materialModel.js";
import packageModel from "../models/packageModel.js";

const base = crud(serviceModel, "serviceId",{
    getPopulate:[
        {path:"tasks", select:"name"},
        {path:"materials", select:"name"},
        {path:"packages", select:"name"}
    ],
    checkRefsArray:[
        {ModelCheck:taskModel, idToCheck:"tasks"},
        {ModelCheck:materialModel, idToCheck:"materials"},
        {ModelCheck:packageModel, idToCheck:"packages"}
    ]
})

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    update: base.update
}