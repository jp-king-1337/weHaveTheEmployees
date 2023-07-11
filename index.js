const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = require("./connection");
const employeeController = require("./controllers/employeeController");
const fs = require("fs");


fs.readFile("./db/schema.sql", "utf8", (err, data) => {
    if (err) throw err;

    console.log("Schema executed successfully.");
});

function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menuOptions",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department"
                    // BONUS:
                    // "Update Employee Managers",
                    // "View By Manager",
                    // "View By Department",
                    // "Delete Options", // Departments, roles, employees
                    // "View Budget" // View total utilized budget of a department - the combined salaries of all employees in that department
                ]
            }
        ])
        .then((answer) => {
            switch (answer.menuOptions) {
                case "View All Employees":
                    employeeController.viewAllDepartments();
                    break;
                case "Add Employee":
                    employeeController.addEmployee();
                    break;
                case "Update Employee Role":
                    employeeController.updateEmployeeRole();
                    break;
                case "View All Roles":
                    employeeController.viewAllRoles();
                    break;
                case "Add Role":
                    employeeController.addRole();
                    break;
                case "View All Departments":
                    employeeController.viewAllDepartments();
                    break;
                case "Add Department":
                    employeeController.addDepartment();
                    break;
                // BONUSes here
                case "Quit":
                    connection.end();
                    console.log("Disconnected from the MySQL server.");
                    break;
                default:
                    break;
            }
        });
}

mainMenu();