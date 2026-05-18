CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) DEFAULT 25000
);

INSERT INTO employees (name, email, department, salary)
VALUES ('Arun', 'arun@gmail.com', 'Developer', 40000);

INSERT INTO employees (name, email, department, salary)
VALUES
('Priya', 'priya@gmail.com', 'Testing', 32000),
('Karthik', 'karthik@gmail.com', 'Developer', 45000),
('Divya', 'divya@gmail.com', 'HR', 35000),
('Vijay', 'vijay@gmail.com', 'Testing', 28000),
('Meena', 'meena@gmail.com', 'Developer', 50000);

INSERT INTO employees (name, email, department, salary)
VALUES ('Rahul', 'rahul@gmail.com', 'QA', 38000);

UPDATE employees
SET salary = 55000
WHERE id = 3;

UPDATE employees
SET department = 'QA'
WHERE department = 'Testing';

UPDATE employees
SET salary = salary + 5000
WHERE department = 'Developer';

UPDATE employees
SET department = 'Manager',
    salary = 60000
WHERE id = 2;

DELETE FROM employees
WHERE salary < 30000;