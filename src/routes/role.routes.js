const roleController = require("../controllers/roleController");
const asyncHandler = require("../middlewares/asyncHandler");
const validateObjectId = require("../middlewares/validateObjectId");
const {validatePermissions} = require("../middlewares/validateRoles");

const router = require("express").Router();

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

module.exports = router;