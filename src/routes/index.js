import express from'express';
import employeeRoutes from'./employee.routes.js';
import roleRoutes from"./role.routes.js";
import clientRoutes from"./client.routes.js";
import companyRoutes from"./company.routes.js";
import departmentRoutes from "./department.routes.js"
import materialRoutes from "./material.routes.js"
import ownerRoutes from "./owner.routes.js"
import teamRoutes from "./team.routes.js"
import subTeamRoutes from "./subTeam.routes.js"
import packageRoutes from "./package.routes.js"
import serviceRoutes from "./service.routes.js"
import supplierRoutes from "./supplier.routes.js"
import taskRoutes from "./task.routes.js"



const router = express.Router();
router.use('/roles',roleRoutes );
router.use('/employees', employeeRoutes);
router.use('/clients',clientRoutes)
router.use('/company',companyRoutes)
router.use('/departments',departmentRoutes)
router.use("/materials",materialRoutes)
router.use("/owners",ownerRoutes)
router.use("/teams",teamRoutes)
router.use("/subTeams",subTeamRoutes)
router.use("/packages",packageRoutes)
router.use("/services",serviceRoutes)
router.use("/suppliers",supplierRoutes)
router.use("/tasks",taskRoutes)



// add other routers below, e.g. companies, projects, suppliers


export default router;