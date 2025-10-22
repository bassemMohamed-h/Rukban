const Employee = require('../models/employeeModel');
const { updateArrays } = require('../utils/updateArraysHelper');
const crud = require('./crudController');

// Use the generic CRUD but you can extend with custom logic
const base = crud.generate(Employee);

module.exports = {
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  remove: base.remove,
  updateArrays:base.updateArrays

  // add extra endpoints specific to employees below
};
