import crud from "./crudController.js";
import teamModel from "../models/teamModel.js";
import departmentModel from "../models/departmentModel.js";
import employeeModel from "../models/employeeModel.js";
import subTeamModel from "../models/subTeamModel.js";
const base = crud(teamModel, "teamId",{
    getPopulate: [
        {path:"departmentId",   select:"name"},
        {path:"members",        select:"firstname lastname"}
    ],
    checkRef:       [{ModelCheck:departmentModel, idToCheck:"departmentId"}],
    checkRefsArray: [{ModelCheck:employeeModel,    idToCheck:"members"}],
    restrictDelete: [
        {ModelCheck:subTeamModel,   idToDelete:"teamId"},
        {ModelCheck:employeeModel,  idToDelete:"teamId"}
    ]
});

export default{
    getOne: base.getOne,
    getAll: base.getAll,
    create: base.create,
    update:base.update,
    remove: base.remove,

}