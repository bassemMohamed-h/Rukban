import crud from "./crudController.js";
import userModel from "../models/userModel.js";
import roleModel from "../models/roleModel.js";
import departmentModel from "../models/departmentModel.js";
import teamModel from "../models/teamModel.js";

const base = crud( userModel, "userId", {
    getPopulate:[
        {path:"roles",select:"name"},           {path:"employeeId",select:"firstname lastname"},
        {path:"teamId",select:"name"},          {path:"subTeamId",select:"name"},
        {path:"departmentId",select:"name"}, 
    ],
    checkRef:[
        {ModelCheck:departmentModel, idToCheck:"departmentId"},
        {ModelCheck:teamModel, idToCheck:"teamId"}
    ],
    checkRefsArray:[{ModelCheck:roleModel, idToCheck:"roles"}]
}
);
export default{
    getOne:base.getOne,
    getAll:base.getAll,
    create:base.create,
    remove:base.remove,
    update:base.update,

}