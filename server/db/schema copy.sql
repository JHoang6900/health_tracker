-- DROP SCHEMA IF EXISTS employee_db;
-- CREATE SCHEMA IF NOT EXISTS employee_db;

-- USE employee_db;

-- CREATE TABLE IF NOT EXISTS departments (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS roles (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id INT NOT NULL,
--     FOREIGN KEY (department_id) REFERENCES departments(id)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE 
-- );

-- CREATE TABLE IF NOT EXISTS employees (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT NOT NULL,
--     manager_id INT DEFAULT NULL,
--     FOREIGN KEY (role_id) REFERENCES roles(id)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE 
-- )


