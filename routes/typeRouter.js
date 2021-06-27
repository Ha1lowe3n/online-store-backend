const Router = require("express");

const typeController = require("../controllers/typeController");

const router = new Router();

const { create, getType } = typeController;

router.post("/", create);
router.get("/", getType);

module.exports = router;
