import express from'express';
import authRoutes from"./auth.routes.js";
import employeeRoutes from'./employee.routes.js';
import roleRoutes from"./role.routes.js";
import clientRoutes from"./client.routes.js";
import companyRoutes from"./company.routes.js";
import departmentRoutes from "./department.routes.js"
const router = express.Router();
router.use("/auth", authRoutes);
router.use('/roles',roleRoutes);
router.use('/employees', employeeRoutes);
router.use('/clients',clientRoutes)
router.use('/company',companyRoutes)
router.use('/departments',departmentRoutes)


// add other routers below, e.g. companies, projects, suppliers


export default router;