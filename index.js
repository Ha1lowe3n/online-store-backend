const express = require("express");
require("dotenv").config();

const sequelize = require("./db.js");
const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate(); // connect to db
        await sequelize.sync(); // сверяет соястояние бд со схемой данных, которые мы описываем
        app.listen(() => {
            console.log(`Server is working on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};
start();
