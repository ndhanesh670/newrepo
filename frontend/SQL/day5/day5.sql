CREATE DATABASE bank_db;
USE bank_db;

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50) NOT NULL,
    city VARCHAR(50)
);

CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    account_type VARCHAR(20),
    balance INT,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    amount INT,
    transaction_type VARCHAR(20),
    
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

INSERT INTO customers (customer_name, city)
VALUES
('Arun', 'Chennai'),
('Priya', 'Madurai');

INSERT INTO accounts (customer_id, account_type, balance)
VALUES
(1, 'Savings', 5000),
(2, 'Current', 10000);

INSERT INTO transactions (account_id, amount, transaction_type)
VALUES
(1, 1000, 'Deposit'),
(1, 500, 'Withdraw'),
(2, 2000, 'Deposit');

SELECT * FROM customers;
SELECT * FROM accounts;
SELECT * FROM transactions;