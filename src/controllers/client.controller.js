const Client = require('../models/clientModel');
const crud = require('./crudController');

// Use the generic CRUD but you can extend with custom logic
const base = crud.generate(Client);

module.exports = {
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  remove: base.remove,
  updateArrays:base.updateArrays

  // add extra endpoints specific to Clients below
};
