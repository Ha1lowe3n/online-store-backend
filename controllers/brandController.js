const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getBrand(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    // async deleteBrand(req, res) {
    //     const brandId = req.params.id;
    //     const brands = await Brand.
    //     return res.json(brands);
    // }
}

module.exports = new BrandController();
