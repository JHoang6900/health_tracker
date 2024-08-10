-- Insert dummy data into the 'users' table
INSERT INTO users (username) VALUES
('nurse1'),
('nurse2'),
('nurse3'),
('doctor1');

-- Insert dummy data into the 'patients' table
INSERT INTO patients (name) VALUES
('John Doe'),
('Jane Smith'),
('Alice Johnson');

-- Insert dummy data into the 'vitals' table (multiple records per patient)
INSERT INTO vitals (patient_id, user_id, datetime, blood_pressure, pulse, oxygen, temperature, respiration) VALUES
(1, 1, '2024-08-09 10:00:00', '120/80', 72, 98, 98.2, 16),
(1, 2, '2024-08-09 14:30:00', '130/85', 78, 97, 96.9, 18),
(1, 1, '2024-08-10 08:15:00', '115/75', 68, 99, 96.0, 15),

(2, 3, '2024-08-08 16:45:00', '140/90', 82, 95, 99.2, 20),
(2, 2, '2024-08-09 12:20:00', '135/88', 76, 96, 90.6, 17),
(2, 4, '2024-08-07 18:00:00', '130/84', 75, 96, 93.7, 17),

(3, 1, '2024-08-10 09:30:00', '110/70', 65, 98, 97.8, 14),
(3, 2, '2024-08-09 20:00:00', '125/82', 70, 97, 99.0, 16),
(3, 3, '2024-08-08 11:30:00', '118/78', 62, 99, 98.4, 15);


-- SELECT STATEMENT: 

-- SELECT 
--     vitals.vital_id, 
--     vitals.patient_id,
--     patients.name AS patient_name, 
--     vitals.user_id,
--     users.username AS user_name,
--     vitals.datetime, 
--     vitals.blood_pressure, 
--     vitals.pulse, 
--     vitals.oxygen, 
--     vitals.temperature, 
--     vitals.respiration
-- FROM vitals
-- JOIN patients on vitals.patient_id = patients.patient_id
-- JOIN users on vitals.user_id = users.user_id;



-- SHORTHAND SELECT STATEMENT VERSION:

-- SELECT 
--     v.vital_id, 
--     v.patient_id,
--         p.name AS patient_name, 
--     v.user_id,
--         u.username AS user_name,
--     v.datetime, 
--     v.blood_pressure, 
--     v.pulse, 
--     v.oxygen, 
--     v.temperature, 
--     v.respiration


-- FROM vitals v
-- JOIN patients p ON v.patient_id = p.patient_id
-- JOIN users u ON v.user_id = u.user_id;