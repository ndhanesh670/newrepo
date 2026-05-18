CREATE DATABASE college_db;
USE college_db;

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    course VARCHAR(50)
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(50),
    salary INT DEFAULT 25000
);

CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(50)
);

CREATE TABLE employees_fk (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(50),
    dept_id INT,
    
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    price INT CHECK (price > 100)
);

RENAME TABLE students TO college_students;

ALTER TABLE college_students
RENAME COLUMN name TO student_name;