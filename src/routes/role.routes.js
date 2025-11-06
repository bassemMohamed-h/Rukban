import  express from "express";
import  roleController from "../controllers/roleController.js";
import  asyncHandler from "../middlewares/asyncHandler.js";
import  validateObjectId from "../middlewares/validateObjectId.js";
import  {validatePermissions} from "../middlewares/validateRoles.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createRoleSchema, updateRoleSchema } from "../validation/role.validation.js";

const router = express.Router();
router.get("/",asyncHandler(roleController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(roleController.getOne))

router.post("/",
    validate(createRoleSchema),
    validatePermissions,
    asyncHandler(roleController.create)
);

router.put("/:id",
    validateObjectId,
    validate(updateRoleSchema),
    validatePermissions,
    asyncHandler(roleController.updateArrays)
);

router.delete("/:id",
    validateObjectId,
    asyncHandler(roleController.remove))

export default router;