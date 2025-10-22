const express = require('express');
const authRoutes = require("./auth.routes");
const employeeRoutes = require('./employee.routes');
const roleRoutes = require("./role.routes");
const clientRoutes =require("./client.routes")

const router = express.Router();
router.use("/auth", authRoutes);
router.use('/roles',roleRoutes);
router.use('/employees', employeeRoutes);
router.use('/clients',clientRoutes)


// add other routers below, e.g. companies, projects, suppliers


module.exports = router;