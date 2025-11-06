import express from'express';
import ownerRoutes from "./owner.routes.js"
import employeeRoutes from'./employee.routes.js';
import roleRoutes from"./role.routes.js";
import clientRoutes from"./client.routes.js";
import companyRoutes from"./company.routes.js";
import departmentRoutes from "./department.routes.js"
import materialRoutes from "./material.routes.js"
import teamRoutes from "./team.routes.js"
import subTeamRoutes from "./subTeam.routes.js"
import packageRoutes from "./package.routes.js"
import serviceRoutes from "./service.routes.js"
import supplierRoutes from "./supplier.routes.js"
import taskRoutes from "./task.routes.js"
import projectRoutes from "./project.routes.js"

const router = express.Router();

router.use("/owners",ownerRoutes)
router.use('/company',companyRoutes)
router.use('/departments',departmentRoutes)
router.use("/teams",teamRoutes)
router.use("/subTeams",subTeamRoutes)
router.use('/employees', employeeRoutes);
router.use('/roles',roleRoutes );
router.use("/tasks",taskRoutes)
router.use("/services",serviceRoutes)
router.use("/materials",materialRoutes)
router.use("/suppliers",supplierRoutes)
router.use("/packages",packageRoutes)
router.use('/projects',projectRoutes)
router.use('/clients',clientRoutes)

export default router;