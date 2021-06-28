const Router = require("express");

const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();

const { create, getAllDevices, getOneDevice } = deviceController;

router.post("/", checkRole("ADMIN"), create);
router.get("/", getAllDevices);
router.get("/:id", getOneDevice);

module.exports = router;
