const Router = require("express");

const brandController = require("../controllers/brandController");

const router = new Router();

const { create, getBrand } = brandController;

router.post("/", create);
router.get("/", getBrand);

module.exports = router;
