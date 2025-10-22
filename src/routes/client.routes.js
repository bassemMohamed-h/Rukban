const clientController = require("../controllers/client.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const validateObjectId = require("../middlewares/validateObjectId");

const router = require("express").Router();

router.get("/",asyncHandler(clientController.getAll));
router.get("/:id",
    validateObjectId,
    asyncHandler(clientController.getOne)
)

router.post("/",asyncHandler(clientController.create));
router.put("/:id",
    validateObjectId,
    asyncHandler(clientController.updateArrays));
router.delete("/:id",
    validateObjectId,
    asyncHandler(clientController.remove)
)




module.exports = router