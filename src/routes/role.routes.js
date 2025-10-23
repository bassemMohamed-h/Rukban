import  express from "express";
import  roleController from "../controllers/roleController.js";
import  asyncHandler from "../middlewares/asyncHandler.js";
import  validateObjectId from "../middlewares/validateObjectId.js";
import  {validatePermissions} from "../middlewares/validateRoles.js";

const router = express.Router();
router.get("/",asyncHandler(roleController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(roleController.getOne))

router.post("/",
    validatePermissions,
    asyncHandler(roleController.create)
);

router.put("/:id",
    validateObjectId,
    validatePermissions,
    asyncHandler(roleController.updateArrays)
);

router.delete("/:id",
    validateObjectId,
    asyncHandler(roleController.remove))

export default router;