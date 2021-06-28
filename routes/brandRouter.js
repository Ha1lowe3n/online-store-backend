const Router = require("express");

const brandController = require("../controllers/brandController");

const router = new Router();

const { create, getBrand, deleteBrand } = brandController;

router.post("/", create);
router.get("/", getBrand);
//router.delete("/:id", deleteBrand);

module.exports = router;
