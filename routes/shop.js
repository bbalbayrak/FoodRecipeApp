const express = require("express");
const foodsController = require("../controllers/shop");

const router = express.Router();
//ALL FOODS
router.get("/", foodsController.getFoods);

module.exports = router;
