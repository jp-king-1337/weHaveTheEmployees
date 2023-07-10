const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3333,
    user: "root",
    password: "",
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL server.");
})

// I know I need main menu
function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
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
            switch (answer.action) {
                case "View All Employees":
                    // Function to handle viewing all employees
                    break;
                case "Add Employee":
                    // Handle adding employee
                    break;
                case "Update Employee Role":
                    // Handle updating employee role
                    break;
                case "View All Roles":
                    // Handle viewing all roles
                    break;
                case "Add Role":
                    // Handle adding a role
                    break;
                case "View All Departments":
                    // Handle viewing all departments
                    break;
                case "Add Department":
                    // Handle adding a department
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