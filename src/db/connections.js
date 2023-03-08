const {Sequelize} = require("sequelize");

const connection = new Sequelize(process.env.MYSQL_URI, {
    retry: { match: [/Deadlock/i], max: 3} // <-- error and don't know what it is
});

connection.authenticate();

module.exports = connection