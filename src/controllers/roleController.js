const Role = require("../models/roleModel");
const crud = require("./crudController");
const roleService = require("../services/role.service.js");
const { updateArrays } = require("../utils/updateArraysHelper.js");

const base = crud.generate(Role);
const updateRole = async (req,res)=>{    
    if(!req.body.action) throw new Error("no action taken")
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedRole });
}
module.exports ={
    getAll:base.getAll,
    getOne:base.getOne,
    create:base.create,
    remove:base.remove,
    updateArrays:base.updateArrays,
    //updateRole
}