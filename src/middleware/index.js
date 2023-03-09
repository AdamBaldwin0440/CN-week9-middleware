const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const User = require("../users/model");

const hashPass = async (req, res, next) => {
    try {
    if (!req.body.password) {
        const error = new Error ("No Password")
        res.status(500).json({errorMessage: error.message, error: error})
    }
    req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(saltRounds),
        console.log("made it this far")
    );
    next(); //replaces the plaintext with the hashedpass to pass to next func
   } catch (error) {
    res.status(501).json({errorMessage: error.message, error: error})
    console.log("didn't reach this")
   }
}

const comparePass = async (req, res, next) => {
    try{
        if (!req.body.username){
            const error = new Error ("incorrect username");
            res.status(500).json({ errorMessage: error.message, error: error });
        }
        if (!req.body.password){
            const error = new Error ("incorrect password");
            res.status(500).json({ errorMessage: error.message, error: error })
        }
        req.user = await User.findOne({where: {username: req.body.username}});
        const match = await bcrypt.compare(req.body.password, req.user.password);

        if (!match){
            const error = new Error ("password does not match");
            res.status(500).json({ errorMessage: error.message, error: error });
        }
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}

const tokenCheck = async (req, res, next) => {
    console.log(req)
    try{
        const token = req.header("Authorization");
        console.log(token);
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({where: {id: decodedToken.id}});

        if(!user){
            const error = new Error("User has not been authenticated")
            res.status(401).json({ errorMessage: error.message, error: error });
        }
        req.authCheck = user;
        next();
    } catch (error){
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


module.exports = {
    hashPass,
    comparePass,
    tokenCheck,
}

//three functions:
// 1. hashPass - hashes password using bcrypt.hash(plaintextpassword, salt)
//plaintextpassword = what's put into TC
// 2. comparePass - compares passwords via bcrypt.compare(plaintextpassword, hashedPassword),
// requires getting the existing password from db
// 3. tokenCheck - use jwt.verify(token, secret) <-- find user based on ID that comes out of token

