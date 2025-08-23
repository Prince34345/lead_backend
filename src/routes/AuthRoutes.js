const express = require("express");

const Auth_Routes = express.Router();
const {postUser, getUsers, getUserById, updateUserById, deleteUserbyId} = require("../controllers/authController");


Auth_Routes.post("/users" , postUser);
Auth_Routes.get("/user/:id" , getUserById);
Auth_Routes.put("/user/:id" , updateUserById);
Auth_Routes.get("/users" , getUsers);
Auth_Routes.delete("/user/:id", deleteUserbyId);



module.exports = Auth_Routes;