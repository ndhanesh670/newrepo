CREATE TABLE election_results (
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(50) NOT NULL,
    party_name VARCHAR(50) NOT NULL,
    district VARCHAR(50),
    constituency VARCHAR(50),
    total_votes INT,
    election_year INT
);

INSERT INTO election_results
(candidate_name, party_name, district, constituency, total_votes, election_year)
VALUES
('Arun Kumar', 'DMK', 'Chennai', 'Anna Nagar', 85000, 2026),
('Priya', 'AIADMK', 'Coimbatore', 'Singanallur', 65000, 2026),
('Karthik', 'BJP', 'Madurai', 'Madurai Central', 72000, 2026),
('Divya', 'DMK', 'Chennai', 'T Nagar', 91000, 2026),
('Vijay', 'Congress', 'Madurai', 'Thiruparankundram', 58000, 2026),
('Meena', 'DMK', 'Salem', 'Salem North', 76000, 2026),
('Rahul', 'NTK', 'Chennai', 'Velachery', 69000, 2026),
('Sneha', 'AIADMK', 'Madurai', 'Madurai South', 64000, 2026);

SELECT * FROM election_results;

SELECT candidate_name, party_name
FROM election_results;

SELECT *
FROM election_results
WHERE total_votes > 70000;

SELECT *
FROM election_results
WHERE district = 'Chennai';

SELECT *
FROM election_results
WHERE party_name = 'DMK';

SELECT *
FROM election_results
WHERE district = 'Madurai'
AND total_votes > 60000;

SELECT *
FROM election_results
ORDER BY total_votes ASC;

SELECT *
FROM election_results
ORDER BY total_votes DESC;

SELECT *
FROM election_results
ORDER BY district ASC;

SELECT COUNT(*) AS total_candidates
FROM election_results;