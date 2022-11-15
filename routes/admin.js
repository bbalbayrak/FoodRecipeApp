const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

//ADMIN FOODS FOR CRUD OPERATION
router.get("/foods", isLoggedIn, adminController.getAdminFoods);

//ADD FOODS
router.post("/add-foods", adminController.postAddFoods);
router.get("/add-foods", isLoggedIn, adminController.getAddFoods);

//UPDATE FOODS
router.get("/update-foods/:foodId", isLoggedIn, adminController.getUpdateFoods);
router.post("/update-foods", adminController.postUpdateFoods);

//DELETE FOODS
router.post("/delete-foods", adminController.postDeleteFoods);

module.exports = router;
