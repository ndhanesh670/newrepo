CREATE DATABASE college_db;
USE college_db;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50),
    age INT
);

CREATE TABLE student_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(100)
);

DELIMITER $$

CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_log (message)
    VALUES (CONCAT(NEW.student_name, ' inserted successfully'));
END $$

DELIMITER ;

INSERT INTO students (student_name, age)
VALUES ('Arun', 20);

SELECT * FROM students;
SELECT * FROM student_log;