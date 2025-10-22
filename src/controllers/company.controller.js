const crud = require("./crudController");
const Company = require("../models/companyModel")

const base = crud.generate(Company);
module.exports = {
    create: base.create,
    getOne:base.getOne,
    getAll:base.getAll,
    updateArrays:base.updateArrays,
    remove:base.remove
}