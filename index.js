const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = require("./connection");
const employeeController = require("./controllers/employeeController");
const fs = require("fs");


fs.readFile("./db/schema.sql", "utf8", (err, data) => {
    if (err) throw err;

    console.log("Schema executed successfully.");
});

employeeController.mainMenu();