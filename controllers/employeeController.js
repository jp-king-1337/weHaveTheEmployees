const inquirer = require("inquirer");
const connection = require("../connection");

// This shows up in every function. Now I can easily call it.
const handleError = (err) => {
    if (err) throw err;
};


// Viewing functions
// Handle viewing all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";

    connection.query(query, (err, res) => {
        handleError(err);

        console.table(res);
        mainMenu();
    });
}

// Handle viewing all roles
function viewAllRoles() {
    const query = "SELECT * FROM roles";

    connection.query(query, (err, res) => {
        handleError(err);

        console.table(res);
        mainMenu();
    });
}

// Function to handle viewing all employees
function viewAllEmployees() {
    const query = "SELECT * FROM employees";

    connection.query(query, (err, res) => {
        handleError(err);

        console.table(res);
        mainMenu();
    });
}

// Adding functions
// Handle adding a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the department?"
            },
        ])
        .then((answer) => {
            const query = "INSERT INTO departments (name) VALUES (?)";
            const values = [answer.department];

            connection.query(query, values, (err, res) => {
                handleError(err);

                console.log(`Added ${answer.department} to the database.`);
                mainMenu();
            });
        });
}

// Handle adding a role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "roleDept",
                choices: [
                    // Gotta get the departments
                ]
            }
        ])
        .then((answer) => {
            const query = "INSERT INTO roles (name) VALUES (?)";
            const values = [answer.name];

            connection.query(query, values, (err, res) => {
                handleError(err);

                console.log("Role added successfully!");
                mainMenu();
            });
        });
}

// Handle adding employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter employee name:"
            },
        ])
        .then((answer) => {
            const query = "INSERT INTO employees (name) VALUES (?)";
            const values = [answer.name];

            connection.query(query, values, (err, res) => {
                handleError(err);

                console.log("Employee added successfully!");
                mainMenu();
            });
        });
}


// Update functions
// Handle updating employee role
function updateEmployeeRole() {
    // Get the list of employees and roles from the database
    const employeeQuery = "SELECT * FROM employees";
    const roleQuery = "SELECT * FROM roles";

    connection.query(employeeQuery, (err, employees) => {
        handleError(err);

        connection.query(roleQuery, (err, roles) => {
            handleError(err);


        })
    })
}
