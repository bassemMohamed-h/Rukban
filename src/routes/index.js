const express = require('express');
const authRoutes = require("./auth.routes");
const employeeRoutes = require('./employee.routes');
const roleRoutes = require("./role.routes");
const clientRoutes =require("./client.routes")
const companyRoutes = require("./company.routes")
const router = express.Router();
router.use("/auth", authRoutes);
router.use('/roles',roleRoutes);
router.use('/employees', employeeRoutes);
router.use('/clients',clientRoutes)
router.use('/company',companyRoutes)


// add other routers below, e.g. companies, projects, suppliers


module.exports = router;