// Put business logic here (optional). Controllers should stay thin.
const Employee = require('../models/employeeModel');

exports.findByEmail = async (email) => {
  return Employee.findOne({ 'phones.0': email });
};
