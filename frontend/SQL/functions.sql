CREATE DATABASE company;
use company;

CREATE TABLE employees (

emp_id int primary key AUTO_INCREMENT,
emp_name varchar(100) not null,
email varchar(100) not null,
dept varchar(100) not null,
salary float,
city varchar(100),
creation date not null


);

insert into employees (emp_name, email, dept, salary, city, creation)
values (upper("vijay"), lower("123@gmail.com"), "IT", round(30123), "chennai", 

