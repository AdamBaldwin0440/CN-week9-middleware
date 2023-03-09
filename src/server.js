require("dotenv").config();
const { application } = require("express");
const express = require("express");

const User = require("./users/model");

const userRouter = require("./users/routes")

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

const syncTables = () => {
    User.sync({ alter: true, force:false});
}

app.use(userRouter)

app.get("/health", (req, res) =>{
    res.status(200)
})

app.listen(port, () =>{
    syncTables();
    console.log(`port is listening on ${port}`)
})