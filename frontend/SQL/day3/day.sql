ALTER TABLE employees
ADD age INT;

SELECT COUNT(*) AS total_employees
FROM employees;

SELECT SUM(salary) AS total_salary
FROM employees;

SELECT MIN(salary) AS minimum_salary
FROM employees;

SELECT COUNT(*) AS employees_above_25
FROM employees
WHERE age > 25;

SELECT SUM(salary) AS developer_total_salary
FROM employees
WHERE department = 'Developer';

SELECT AVG(age) AS average_age
FROM employees;

SELECT MAX(age) AS max_age
FROM employees;

SELECT MIN(age) AS min_age
FROM employees;