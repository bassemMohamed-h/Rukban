import crud from "./crudController.js";
import subTeamModel from "../models/subTeamModel.js";
import departmentModel from "../models/departmentModel.js";
import teamModel from "../models/teamModel.js";
import employeeModel from "../models/employeeModel.js";

const base = crud(subTeamModel,"subTeamId",{
    getPopulate:[
        {path:"departmentId",   select:"name"},
        {path:"teamId",         select:"name"},
        {path:"subLeader",      select:"firstname lastname"},
        {path:"members",        select:"firstname lastname"}
    ],
    checkRef:[
        {ModelCheck:departmentModel, idToCheck:"departmentId"},
        {ModelCheck:teamModel, idToCheck:"teamId"},
    ],
    checkRefsArray: [{ModelCheck:employeeModel, idToCheck:"members"}],
    restrictDelete: [{ModelCheck:employeeModel, idToDelete:"subteamId"}]
})

export default {
    getOne: base.getOne,
    getAll: base.getAll,
    create: base.create,
    update: base.update,
    remove: base.remove,
}