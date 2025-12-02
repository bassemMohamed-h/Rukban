import crud from "./crudController.js";
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import serviceModel from "../models/serviceModel.js";
import packageModel from "../models/packageModel.js";
import projectModel from "../models/projectModel.js";

const base = crud(taskModel,"taskId",{
    getPopulate:[
        {path:"assignedTo", select:"username"},
        {path:"serviceId",  select:"name"},
        {path:"packageId",  select:"name"},
        {path:"projectId",  select:"name"}
        
],
    checkRef:[
        {ModelCheck: userModel,     idToCheck:"assignedTo", },
        {ModelCheck: serviceModel,  idToCheck:"serviceId", },
        {ModelCheck: packageModel,  idToCheck:"packageId", },
        {ModelCheck: projectModel,  idToCheck:"projectId", }
    ],
})

export default {
    create: base.create,
    remove: base.remove,
    getOne: base.getOne,
    getAll: base.getAll,
    update: base.update
}