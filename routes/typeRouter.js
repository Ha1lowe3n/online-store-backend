const Router = require("express");

const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();

const { create, getType } = typeController;

router.post("/", checkRole("ADMIN"), create);
router.get("/", getType);

module.exports = router;
