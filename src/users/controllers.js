const User = require("./model");
const jwt = require("jsonwebtoken");


const registerUser= async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({message: "success", user:{username: user.username, email: user.email}})
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const login = async (req, res) => {
    try {
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET_KEY);
        res.status(201).json({
            message: "successful",
            user: {username: req.user.username, 
            email: req.user.email, 
            token: token},
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });

    }
}

const getAllUsers = async (req, res) => {
    try {
        if (!req.authCheck){
            const error = new Error ("Not authorised");
            res.status(401).json({ errorMessage: error.message, error: error });
        }
        const users = await User.findAll();
        for (let user of users) {
            user.password = "";
        } 
        res.status(200).json({
            message: "successful",
            users: users
        })
    } catch (error){
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}

module.exports = {registerUser, login, getAllUsers}

//register after hashPass create user (.create method)
// login <-- assign a jwt using jwt.assign(userid, secret)
// getAllUsers - after tokenCheck, getAllUsers <--findAll()


