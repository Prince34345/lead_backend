const express = require("express");

const Auth_Routes = express.Router();
const {registerUser, login, logout, myProfile} = require("../controllers/authController");


Auth_Routes.post("/register" , registerUser);
Auth_Routes.post("/login", login)
Auth_Routes.post("/logout" , logout);
Auth_Routes.get("/user/:id",  myProfile);



module.exports = Auth_Routes;