USE employee_db;

-- ChatGPT suggested this, which brought an end to the errors I was having with MySQL.
ALTER TABLE roles DROP FOREIGN KEY roles_ibfk_1;
ALTER TABLE employees DROP FOREIGN KEY employees_ibfk_1;

-- Not entirely sure I need these. Will test later and see.
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL DEFAULT "",
    department_id INT,
    salary DECIMAL(10,2) NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);