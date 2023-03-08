const {Router} = require("express");
const userRouter = Router();

const {hashPass, comparePass, tokenCheck} = require("../middleware");
const {registerUser, login, getAllUsers} = require("./controllers")

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/getallusers", tokenCheck, getAllUsers) //token protected route

module.exports = userRouter;