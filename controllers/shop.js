const Food = require("../models/food");

exports.getFoods = (req, res, next) => {
  Food.find()
    .then((foods) => {
      res.render("shop/foods", {
        path: "/",
        pageTitle: "All Foods",
        food: foods,
        isAuthenticated: req.session.isLoggedIn,
      });
      // res.status(200).json();
      // res.json({requestBody: req.body})
      console.log(req.body);
    })
    .catch((err) => console.log(err));
};
