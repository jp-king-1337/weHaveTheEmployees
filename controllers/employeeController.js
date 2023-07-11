const inquirer = require("inquirer");
const connection = require("../connection");

const { fetchDepartmentsFromDatabase, fetchRolesFromDatabase, fetchManagersFromDatabase } = require("../fetchDatabase");


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
    fetchDepartmentsFromDatabase()
        .then((departments) => {
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
                        choices: departments.map((department) => ({
                            name: department.name,
                            value: department.id
                        })),
                    }
                ])
                .then((answer) => {
                    const query = "INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)";
                    const values = [answer.role, answer.salary, answer.roleDept];

                    connection.query(query, values, (err, res) => {
                        handleError(err);

                        console.log(`Added ${answer.role} to the database.`);
                        mainMenu();
                    });
                });
        })
        .catch((error) => {
            handleError(error);
        });
}


// Handle adding employee
function addEmployee() {
    fetchRolesFromDatabase()
        .then((roles) => {
            fetchManagersFromDatabase()
                .then((managers) => {
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "first_name",
                                message: "What is the employee's first name?"
                            },
                            {
                                type: "input",
                                name: "last_name",
                                message: "What is the employee's last name?"
                            },
                            {
                                type: "list",
                                name: "empRole",
                                choices: roles.map((role) => ({
                                    name: role.title,
                                    value: role.id
                                })),
                            },
                            {
                                type: "list",
                                name: "empManager",
                                choices: managers.map((manager) => ({
                                    name: manager.name,
                                    value: manager.id
                                })),
                            }
                        ])
                        .then((answer) => {
                            const query = "INSERT INTO employees (name) VALUES (?)";
                            const values = [answer.name];

                            connection.query(query, values, (err, res) => {
                                handleError(err);

                                console.log(`Added ${answer.first_name} ${answer.last_name} to the database.`);
                                mainMenu();
                            });
                        });
                })
                .catch((error) => {
                    handleError(error);
                });
        })
        .catch((error) => {
            handleError(error);
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

            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which employee's role do you want to update?",
                        cchoices: employees.map((employee) => ({
                            name: `${employee.firstName} ${employee.lastName}`,
                            value: employee.id
                        })),
                    },
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roles.map((role) => ({
                            name: role.title,
                            value: role.id
                        })),
                    },
                ])
                .then((answers) => {
                    const query = "UPDATE employees SET role_id = ? WHERE id = ?";
                    const values = [answers.roleId, answers.employeeId];

                    connection.query(query, values, (err, res) => {
                        handleError(err);

                        console.log("Updated employee's role.")
                        mainMenu();
                    });
                });
        });
    });
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};