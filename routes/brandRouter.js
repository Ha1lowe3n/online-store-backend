const Router = require("express");

const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();

const { create, getBrand, deleteBrand } = brandController;

router.post("/", checkRole("ADMIN"), create);
router.get("/", getBrand);
//router.delete("/:id", deleteBrand);

module.exports = router;
