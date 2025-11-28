import Client from '../models/clientModel.js';
import projectModel from '../models/projectModel.js';
import crud from './crudController.js';

// Use the generic CRUD but you can extend with custom logic
const base = crud(Client,"clientId",{
  getPopulate:[{path:"projects", select:"name"}],
  checkRefsArray:[{ModelCheck:projectModel, idToCheck:"projects"}],
  restrictDelete:[{ModelCheck:projectModel, idToDelete:"client"}]
});

export default{
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  remove: base.remove,
  update: base.update
};
