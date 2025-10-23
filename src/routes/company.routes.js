import  express from "express"
import  companyController from "../controllers/company.controller.js";
import  asyncHandler from "../middlewares/asyncHandler.js";
import  validateObjectId from "../middlewares/validateObjectId.js";

const router = express.Router();

router.get("/",asyncHandler(companyController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(companyController.getOne))

router.post("/",asyncHandler(companyController.create))
router.put("/:id",
    validateObjectId,
    asyncHandler(companyController.updateArrays)
)
router.delete("/:id",
    validateObjectId,
    asyncHandler(companyController.remove)
)



export default router;