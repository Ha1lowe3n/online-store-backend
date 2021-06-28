const Router = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

const { registration, checkUser, login } = userController;

router.post(
    "/registration",
    [
        check("email", "Почта должна быть указана").notEmpty(),
        check(
            "password",
            "Пароль должен быть больше 4 и меньше 10 символов"
        ).isLength({ min: 4, max: 10 }),
    ],
    registration
);
router.post(
    "/login",
    [
        check("email", "Почта должна быть указана").isEmail(),
        check("password", "Пароль должен быть набран").notEmpty(),
    ],
    login
);
router.get("/auth", authMiddleware, checkUser);

module.exports = router;
