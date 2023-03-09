const {DataTypes} = require("sequelize");
const connection = require("../db/connections");

const Book = connection.define("Book", {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); {indexes: [{unique: true, fields: ["title"]}]}


module.exports = Book;