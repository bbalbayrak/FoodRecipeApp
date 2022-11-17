const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

const adminRoute = require("./routes/admin");
const foodsRoute = require("./routes/shop");
const authRoute = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://username:password@node.8k7fnwn.mongodb.net/recipes?retryWrites=true&w=majority";

const app = express();

const store = new mongodbSession({
  uri: MONGODB_URI,
  collection: "sessions",
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


//SESSION
app.use(
  session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//ROUTES
app.use("/admin", adminRoute);
app.use(foodsRoute);
app.use(authRoute);


//MONGODB CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Burak",
    //       email: "test@test.com",
    //     });
    //     user.save();
    //   }
    //   console.log(user);
    // }); //This part create dummy user at the beginning for doing user stuff
    app.listen(3000);
  })
  .catch((err) => console.log(err));
