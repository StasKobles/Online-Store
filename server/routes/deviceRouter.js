const Router = require("express");
const { getOne } = require("../controllers/deviceController");
const router = new Router();
const DeviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");
router.post("/", checkRole("ADMIN"), DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);

module.exports = router;
