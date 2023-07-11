const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    // password: "",
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
});

module.exports = connection;