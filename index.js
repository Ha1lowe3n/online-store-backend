require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./db");
const models = require("./models/models"); //  подключаем модели в приложение (создаются таблицы в pgAdmin)
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
    try {
        await sequelize.authenticate(); // connect to db
        await sequelize.sync(); // сверяет соястояние бд со схемой данных, которые мы описываем
        app.listen(PORT, () => {
            console.log(`Server is working on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};
start();
