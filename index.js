require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const sequelize = require("./db");
const models = require("./models/models"); //  подключаем модели в приложение (создаются таблицы в pgAdmin)
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// обработка ошибок, последний middleware
app.use(errorHandler);

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
