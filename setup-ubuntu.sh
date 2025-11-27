#!/bin/bash

# VIT Result Management System - Ubuntu Setup Script
# This script automates the installation of all prerequisites for the project

set -e  # Exit on error

echo "================================================"
echo "VIT Result Management System - Ubuntu Setup"
echo "================================================"
echo ""

# Check if running on Ubuntu/Debian
if ! command -v apt &> /dev/null; then
    echo "Error: This script requires apt package manager (Ubuntu/Debian)"
    exit 1
fi

echo "[1/5] Updating system packages..."
sudo apt update
sudo apt upgrade -y

echo ""
echo "[2/5] Installing Java 17..."
sudo apt install -y openjdk-17-jdk openjdk-17-jre
java -version

echo ""
echo "[3/5] Installing Maven..."
sudo apt install -y maven
mvn -version

echo ""
echo "[4/5] Installing Node.js and npm..."
sudo apt install -y nodejs npm
node --version
npm --version

echo ""
echo "[5/5] Installing MySQL Server..."
sudo apt install -y mysql-server

echo ""
echo "================================================"
echo "Installation Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Clone the repository:"
echo "   git clone https://github.com/riteshbagal23/CNTLABWT.git"
echo "   cd CNTLABWT"
echo ""
echo "2. Setup MySQL database:"
echo "   sudo mysql_secure_installation"
echo ""
echo "3. Create database:"
echo "   sudo mysql -u root -p student_db < backend/setup_database.sql"
echo ""
echo "4. Build backend:"
echo "   cd backend && mvn clean install"
echo ""
echo "5. Install frontend dependencies:"
echo "   cd ../frontend && npm install"
echo ""
echo "6. Start backend (Terminal 1):"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "7. Start frontend (Terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "8. Open http://localhost:5173 in your browser"
echo ""
echo "For more details, see README.md"
