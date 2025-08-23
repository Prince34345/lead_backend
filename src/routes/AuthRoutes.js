const express = require("express");

const Auth_Routes = express.Router();

const setCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    })
}

Auth_Routes.post("/users" , postUser);
Auth_Routes.get("/user/:id" , getUserById);
Auth_Routes.put("/user/:id" , updateUserById);
Auth_Routes.get("/users" , getUsers);
Auth_Routes.delete("/user/:id", deleteUserbyId)


module.exports = Auth_Routes;