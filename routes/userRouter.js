const Router = require("express");

const userController = require("../controllers/userController");

const router = new Router();

const { registration, check, login } = userController;

router.post("/registration", registration);
router.post("/login", login);
router.get("/auth", check);

module.exports = router;
