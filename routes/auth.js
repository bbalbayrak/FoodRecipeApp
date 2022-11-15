const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();



//LOGIN
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

//SIGN UP
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//LOGOUT
router.post("/logout", authController.postLogout);

module.exports = router;
