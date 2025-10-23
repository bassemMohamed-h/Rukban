import Employee from '../models/employeeModel.js';
import { updateArrays } from '../utils/updateArraysHelper.js';
import crud from './crudController.js';

// Use the generic CRUD but you can extend with custom logic
const base = crud.generate(Employee);

export default{
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  remove: base.remove,
  updateArrays:base.updateArrays

  // add extra endpoints specific to employees below
};
