#!/bin/bash

# VIT Result Application - Complete Setup and Run Guide

echo "======================================"
echo "VIT Result Application Setup"
echo "======================================"
echo ""

# Step 1: Create MySQL Database
echo "Step 1: Creating MySQL Database..."
echo "Please enter your MySQL root password when prompted."
echo ""

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS student_db; USE student_db; SELECT 'Database created successfully!' AS Status;"

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully!"
else
    echo "❌ Failed to create database. Please check your MySQL credentials."
    exit 1
fi

echo ""
echo "Step 2: Building Spring Boot Application..."
cd "$(dirname "$0")"
mvn clean install

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "Step 3: Starting Spring Boot Application..."
echo "The application will start on http://localhost:8080"
echo "Press Ctrl+C to stop the application"
echo ""

mvn spring-boot:run
