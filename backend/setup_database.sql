-- VIT Result MySQL Database Setup Script
-- Run this script to create the database

-- Create the database
CREATE DATABASE IF NOT EXISTS student_db;

-- Use the database
USE student_db;

-- Show confirmation
SELECT 'Database student_db created successfully!' AS Status;

-- Note: The table 'student_results' will be automatically created by Spring Boot JPA
-- when you run the application for the first time (ddl-auto=update)
