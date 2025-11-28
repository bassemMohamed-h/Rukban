import departmentModel  from '../models/departmentModel.js';
import Employee         from '../models/employeeModel.js';
import subTeamModel     from '../models/subTeamModel.js';
import teamModel        from '../models/teamModel.js';
import crud             from './crudController.js';

// Use the generic CRUD but you can extend with custom logic
const base = crud(Employee, "employeeId",{
  getPopulate:[
    {path:"departmentId", select:"name"},
    {path:"teamId",       select:"name"},
    {path:"subTeamId",    select:"name"}
  ],
  checkRef:[
    {ModelCheck:departmentModel,  idToCheck:"departmentId"},
    {ModelCheck:teamModel,        idToCheck:"teamId"},
    {ModelCheck:subTeamModel,     idToCheck:"subTeamId"}
  ]
}
);

export default{
  getAll: base.getAll,
  getOne: base.getOne,
  create: base.create,
  update:base.update,
  remove: base.remove,

};
