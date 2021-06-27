const Router = require("express");

const deviceController = require("../controllers/deviceController");

const router = new Router();

const { create, getAllDevices, getDevice } = deviceController;

router.post("/", create);
router.get("/", getAllDevices);
router.get("/:id", getDevice);

module.exports = router;
