import express from'express';
import employeeRoutes from'./employee.routes.js';
import roleRoutes from"./role.routes.js";
import clientRoutes from"./client.routes.js";
import departmentRoutes from "./department.routes.js"
import materialRoutes from "./material.routes.js"
import teamRoutes from "./team.routes.js"
import subTeamRoutes from "./subTeam.routes.js"
import packageRoutes from "./package.routes.js"
import serviceRoutes from "./service.routes.js"
import supplierRoutes from "./supplier.routes.js"
import taskRoutes from "./task.routes.js"
import projectRoutes from "./project.routes.js"
import authRoutes from"./auth.routes.js"
import userRoutes from "./user.routes.js"
import {protect} from '../middlewares/authorization.middleware.js';

const router = express.Router();
router.use("/auth",                  authRoutes)
router.use('/departments',  protect, departmentRoutes)
router.use("/teams",        protect, teamRoutes)
router.use("/subTeams",     protect, subTeamRoutes)
router.use('/employees',    protect, employeeRoutes)
router.use('/roles',        protect, roleRoutes )
router.use("/tasks",        protect, taskRoutes)
router.use("/services",     protect, serviceRoutes)
router.use("/materials",    protect, materialRoutes)
router.use("/suppliers",    protect, supplierRoutes)
router.use("/packages",     protect, packageRoutes)
router.use('/projects',     protect, projectRoutes)
router.use('/clients',      protect, clientRoutes)
router.use("/users",        protect, userRoutes)
export default router;
