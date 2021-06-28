const Router = require("express");

const deviceController = require("../controllers/deviceController");

const router = new Router();

const { create, getAllDevices, getOneDevice } = deviceController;

router.post("/", create);
router.get("/", getAllDevices);
router.get("/:id", getOneDevice);

module.exports = router;
