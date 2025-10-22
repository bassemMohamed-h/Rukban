const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authenticated protect' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user; assume Employee model used for users
    const user = await Employee.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  
  const userRole = req.user.role || req.user.roles || 'user';
  // support string or array roles
  const has = Array.isArray(userRole) ? userRole.some(r => allowedRoles.includes(r)) : allowedRoles.includes(userRole);
  if (!has) return res.status(403).json({ message: 'Forbidden' });
  next();
};
