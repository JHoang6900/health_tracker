
DROP SCHEMA IF EXISTS health_tracker_db;
CREATE SCHEMA IF NOT EXISTS health_tracker_db;

USE health_tracker_db;

CREATE TABLE IF NOT EXISTS patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
    -- password VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS vitals (
    vital_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    user_id INT NOT NULL,
    datetime DATETIME NOT NULL,
    blood_pressure VARCHAR(255) NOT NULL,
    pulse INT NOT NULL,
    oxygen INT NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL, 
    respiration INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



