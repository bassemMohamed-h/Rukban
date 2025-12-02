import  express from "express";
import  roleController from "../controllers/roleController.js";
import  asyncHandler from "../middlewares/asyncHandler.js";
import  validateObjectId from "../middlewares/validateObjectId.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createRoleSchema, updateRoleSchema } from "../validation/role.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";

const router = express.Router();
router.get("/",
    authorize(sections.roles, [actions.display]),
    asyncHandler(roleController.getAll))
router.get("/:roleId",
    validateObjectId("roleId"),
    authorize(sections.roles, [actions.display]),
    asyncHandler(roleController.getOne))

router.post("/",
    validate(createRoleSchema),
    authorize(sections.roles, [actions.manage]),
    asyncHandler(roleController.create)
);

router.delete("/:roleId",
    validateObjectId("roleId"),
    authorize(sections.roles, [actions.manage]),
    asyncHandler(roleController.remove))

router.put("/:roleId",
    validateObjectId("roleId"),
    validate(updateRoleSchema),
    authorize(sections.roles, [actions.update]),
    asyncHandler(roleController.update)
);    

export default router;