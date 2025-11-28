import departmentModel from "../models/departmentModel.js";
import Role from "../models/roleModel.js";
import crud from "./crudController.js";

const base = crud(Role, "roleId", {
    checkRef:[{ModelCheck:departmentModel, idToCheck:"restrictedDepartment"}]
});

export default {
    getAll:base.getAll,
    getOne:base.getOne,
    create:base.create,
    remove:base.remove,
    update:base.update
}