const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ApiError = require("../error/ApiError");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }

            const { email, password, role } = req.body;

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким email уже существует",
                });
            }

            const hashPassword = await bcrypt.hashSync(password, 5);
            const user = await User.create({
                email,
                role,
                password: hashPassword,
            });
            const basket = await Basket.create({ userId: user.id });
            const token = generateJwt(user.id, email, user.role);
            return res.json({ token });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: "Registration error" });
        }
    }

    async login(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Ошибка при регистрации", errors });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(
                ApiError.internal("Пользователь с таким email не найден")
            );
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(
                ApiError.internal("Пользователь с таким email не найден")
            );
        }

        const token = generateJwt(user.id, email, user.role);
        return res.json({ token });
    }

    async checkUser(req, res) {
        const { id, email, role } = req.user;
        const token = generateJwt(id, email, role);
        return res.json({ message: "Вы авторизованы" });
    }
}

module.exports = new UserController();
