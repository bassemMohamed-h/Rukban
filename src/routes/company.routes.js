const companyController = require("../controllers/company.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const validateObjectId = require("../middlewares/validateObjectId");

const router = require("express").Router();

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



module.exports = route;