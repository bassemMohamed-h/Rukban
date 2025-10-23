import Role from "../models/roleModel.js";
import crud from "./crudController.js";
import roleService from "../services/role.service.js";
import { updateArrays } from "../utils/updateArraysHelper.js";

const base = crud.generate(Role);
const updateRole = async (req,res)=>{    
    if(!req.body.action) throw new Error("no action taken")
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedRole });
}
export default {
    getAll:base.getAll,
    getOne:base.getOne,
    create:base.create,
    remove:base.remove,
    updateArrays:base.updateArrays,
    //updateRole
}