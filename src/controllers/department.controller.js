import Department from "../models/departmentModel.js"
import employeeModel from "../models/employeeModel.js";
import teamModel from "../models/teamModel.js";
import crud from "./crudController.js";

const base = crud(Department,"departmentId", {
    getPopulate:    [
        {path:"managerId", select:"firstname lastname"},
    ],
    checkRef:       [{ModelCheck:employeeModel, idToCheck:"managerId"}],
    restrictDelete: [{ModelCheck:teamModel,      idToDelete:"departmentId"}]
})
export default{
    getAll: base.getAll,
    getOne: base.getOne,
    create: base.create,
    update: base.update,
    remove: base.remove,
}
