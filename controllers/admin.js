const User = require("../models/user");
const Food = require("../models/food");

exports.getAdminFoods = (req, res, next) => {
  Food.find()
    .then((foods) => {
      const food = foods;
      res.render("admin/all-foods", {
        pageTitle: "Admin Food",
        path: "/admin/foods",
        editing: false,
        food: food,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddFoods = (req, res, next) => {
  res.render("admin/add-edit-food", {
    pageTitle: "Add Food",
    path: "/admin/add-foods",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddFoods = (req, res, next) => {
  const foodTitle = req.body.title;
  const foodImageUrl = req.body.imageUrl;
  const foodRecipe = req.body.recipe;
  const foodIncludes = req.body.includes;
  const food = new Food({
    title: foodTitle,
    imageUrl: foodImageUrl,
    recipe: foodRecipe,
    includes: foodIncludes,
    userName: req.user.name,
    userId: req.user,
  });
  food
    .save()
    .then((newFood) => {
      console.log(newFood);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getUpdateFoods = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const foodId = req.params.foodId;
  Food.findById(foodId)
    .then((foods) => {
      const food = foods;
      if (!food) {
        return res.redirect("/");
      }
      res.render("admin/add-edit-food", {
        pageTitle: "Update Foods",
        path: "/admin/update-foods",
        editing: editMode,
        food: food,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postUpdateFoods = (req, res, next) => {
  const foodId = req.body.foodId;
  const updatedFoodTitle = req.body.title;
  const updatedFoodImageUrl = req.body.imageUrl;
  const updatedFoodRecipe = req.body.recipe;
  const updatedFoodIncludes = req.body.includes;
  const whoUpdatedId = req.user._id;
  const whoUpdatedUsername = req.user.name;
  Food.findById(foodId)
    .then((food) => {
      (food.title = updatedFoodTitle),
        (food.imageUrl = updatedFoodImageUrl),
        (food.recipe = updatedFoodRecipe),
        (food.includes = updatedFoodIncludes),
        (food.userName = whoUpdatedUsername),
        (food.userId = whoUpdatedId);
      return food.save();
    })
    .then((result) => {
      res.redirect("/");
      console.log("updated");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteFoods = (req, res, next) => {
  const foodId = req.body.foodId;
  Food.findByIdAndRemove(foodId)
    .then((result) => {
      res.redirect("/");
      console.log("Food Deleted");
    })
    .catch((err) => console.log(err));
};
