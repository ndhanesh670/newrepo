CREATE DATABASE college_db;
USE college_db;

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(50)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50),
    course_id INT,
    
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO courses (course_name)
VALUES
('Java'),
('Python'),
('SQL'),
('React');

INSERT INTO students (student_name, course_id)
VALUES
('Arun', 1),
('Priya', 2),
('Karthik', NULL),
('Divya', 3),
('Rahul', NULL);

SELECT students.student_name, courses.course_name
FROM students
INNER JOIN courses
ON students.course_id = courses.course_id;

SELECT students.student_name, courses.course_name
FROM students
LEFT JOIN courses
ON students.course_id = courses.course_id;

SELECT students.student_name, courses.course_name
FROM students
RIGHT JOIN courses
ON students.course_id = courses.course_id;