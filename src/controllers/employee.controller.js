import Employee from '../models/employeeModel.js';
import authService from '../services/auth.service.js';
import crud from './crudController.js';

// Use the generic CRUD but you can extend with custom logic
const base = crud.generate(Employee);

export default{
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  remove: base.remove,
  updateArrays:base.updateArrays,

  // add extra endpoints specific to employees below
  signup: async (req, res) => {
    const result = await authService.signup(req.body);
    res.status(201).json({ success: true, data: result });
  },

  signin: async (req, res) => {
    const result = await authService.signin(req.body);
    res.status(200).json({ success: true, data: result });
  }
  
};
