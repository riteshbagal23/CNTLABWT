# VIT Result Management System

A full-stack application for managing VIT student results using Spring Boot (Java 17, MySQL) and React (Vite).

## Tech Stack
- **Backend**: Spring Boot 3.3.4, Java 17, MySQL 8.0
- **Frontend**: React 18, Vite 5, JavaScript
- **Build Tool**: Maven

## Quick Start

### Prerequisites (Ubuntu)
Before cloning the project, ensure you have the following installed:

#### 1. **Java 17**
```bash
sudo apt update
sudo apt install openjdk-17-jdk openjdk-17-jre
java -version  # Should show Java 17
```

#### 2. **Maven**
```bash
sudo apt install maven
mvn -version  # Verify installation
```

#### 3. **Node.js and npm**
```bash
sudo apt install nodejs npm
node --version
npm --version
```

#### 4. **MySQL Server 8.0**
```bash
sudo apt install mysql-server
sudo mysql_secure_installation  # Follow prompts for security setup
```

#### 5. **Git**
```bash
sudo apt install git
git --version
```

### Setup Instructions

#### Step 1: Clone the Repository
```bash
git clone https://github.com/riteshbagal23/CNTLABWT.git
cd CNTLABWT
```

#### Step 2: Setup MySQL Database
```bash
# Login to MySQL
sudo mysql -u root -p

# Inside MySQL shell, run:
```

Create the database and user:
```sql
CREATE DATABASE student_db;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'Ritesh2799@';
GRANT ALL PRIVILEGES ON student_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Or run the SQL file:
```bash
sudo mysql -u root -p student_db < backend/setup_database.sql
```

#### Step 3: Verify Backend Configuration
Open `backend/src/main/resources/application.properties` and verify:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=Ritesh2799@
```

**Note**: If you used a different password, update it in the `application.properties` file.

#### Step 4: Build Backend
```bash
cd backend
mvn clean install
```

First build may take several minutes as Maven downloads dependencies.

#### Step 5: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

# Complete MySQL Database Setup Guide for Ubuntu

## Full Step-by-Step Database Installation & Configuration

### **Phase 1: Install MySQL Server on Ubuntu**

#### Step 1.1: Update System Packages
```bash
sudo apt update
sudo apt upgrade -y
```
**What it does:** Updates package lists and upgrades existing packages to latest versions.

#### Step 1.2: Install MySQL Server 8.0
```bash
sudo apt install mysql-server -y
```
**What it does:** Installs MySQL server and all dependencies.

**Verify Installation:**
```bash
mysql --version
```
Expected output: `mysql  Ver 8.0.x...`

#### Step 1.3: Start MySQL Service
```bash
# Start MySQL service
sudo service mysql start

# Verify it's running
sudo service mysql status
```
**Output should show:** `active (running)`

#### Step 1.4: Enable MySQL to Start on Boot
```bash
sudo systemctl enable mysql
```
**What it does:** MySQL automatically starts when system reboots.

---

### **Phase 2: Initial MySQL Configuration**

#### Step 2.1: Run Security Script (Recommended)
```bash
sudo mysql_secure_installation
```

**Follow these prompts:**

```
1. Enter current password for root (press Enter - no password yet):
   → Press Enter

2. Switch to unix_socket authentication? (Y/n)
   → Type: y
   → Press Enter

3. Change the root password? (Y/n)
   → Type: y
   → Press Enter
   
4. New password:
   → Type: Ritesh2799@
   → Press Enter
   
5. Re-enter new password:
   → Type: Ritesh2799@
   → Press Enter

6. Remove anonymous users? (Y/n)
   → Type: y
   → Press Enter

7. Disable remote root login? (Y/n)
   → Type: y
   → Press Enter

8. Remove test database? (Y/n)
   → Type: y
   → Press Enter

9. Reload privilege tables now? (Y/n)
   → Type: y
   → Press Enter
```

---

### **Phase 3: Create Database & User**

#### Step 3.1: Login to MySQL
```bash
sudo mysql -u root -p
```

**When prompted, enter password:** `Ritesh2799@`

You should see: `mysql>`

#### Step 3.2: Create Database (Inside MySQL Shell)

```sql
-- Create the database for student results
CREATE DATABASE student_db;

-- Verify creation
SHOW DATABASES;

-- Output should show:
-- | Information_schema |
-- | mysql              |
-- | performance_schema |
-- | student_db         |
-- | sys                |
```

#### Step 3.3: Create User & Grant Permissions

```sql
-- Create user 'root' with password (if not already done)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'Ritesh2799@';

-- Grant all permissions on student_db to root user
GRANT ALL PRIVILEGES ON student_db.* TO 'root'@'localhost';

-- Flush privileges to apply changes immediately
FLUSH PRIVILEGES;

-- Verify user creation
SELECT user, host FROM mysql.user;

-- Output should show root with localhost
```

#### Step 3.4: Verify Database Access
```sql
-- Use the student_db database
USE student_db;

-- Create test table to verify access
CREATE TABLE test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert test data
INSERT INTO test (name) VALUES ('Test Entry');

-- View data
SELECT * FROM test;

-- Output should show:
-- | id | name       |
-- |  1 | Test Entry |

-- Drop test table (cleanup)
DROP TABLE test;

-- Exit MySQL
EXIT;
```

---

### **Phase 4: Create Tables for Application**

#### Step 4.1: Method 1 - Using SQL File (Recommended)

```bash
# From project root directory
cd CNTLABWT

# Check if setup_database.sql exists
ls -la backend/setup_database.sql

# Run the SQL file
sudo mysql -u root -p student_db < backend/setup_database.sql

# Enter password: Ritesh2799@
```

#### Step 4.2: Method 2 - Manual SQL Commands

If the SQL file doesn't exist, login and run manually:

```bash
sudo mysql -u root -p
```

Then execute:

```sql
USE student_db;

-- Create student_results table
CREATE TABLE student_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(50) NOT NULL,
    ann_mse DOUBLE,
    ann_ese DOUBLE,
    cnt_mse DOUBLE,
    cnt_ese DOUBLE,
    daa_mse DOUBLE,
    daa_ese DOUBLE,
    cc_mse DOUBLE,
    cc_ese DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- View the created table
DESCRIBE student_results;

-- Output should show all columns with their types:
-- | Field        | Type          | Null | Key |
-- | id           | bigint        | NO   | PRI |
-- | student_name | varchar(255)  | NO   |     |
-- | roll_no      | varchar(50)   | NO   |     |
-- | ann_mse      | double        | YES  |     |
-- | ann_ese      | double        | YES  |     |
-- etc...

-- Verify table creation
SHOW TABLES;

-- Should output: student_results

EXIT;
```

---

### **Phase 5: Configure Spring Boot Connection**

#### Step 5.1: Update Application Properties

Navigate to the properties file:
```bash
nano backend/src/main/resources/application.properties
```

Ensure these properties are set correctly:

```properties
# Server Configuration
server.port=8080
spring.application.name=vit-result

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=Ritesh2799@
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

**Explanation of properties:**

| Property | Value | Purpose |
|----------|-------|---------|
| `server.port` | 8080 | Backend runs on port 8080 |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/student_db` | Connects to MySQL on localhost:3306 for database `student_db` |
| `username` | root | MySQL user |
| `password` | Ritesh2799@ | MySQL password |
| `ddl-auto` | update | Auto-updates table schema on startup |
| `show-sql` | true | Prints SQL queries to console (helpful for debugging) |

#### Step 5.2: Save and Exit
- Press `Ctrl + O` then `Enter` to save
- Press `Ctrl + X` to exit

---

### **Phase 6: Verify Database Connection**

#### Step 6.1: Build and Run Backend

```bash
# Navigate to backend directory
cd backend

# Clean and build the project
mvn clean install

# Start Spring Boot application
mvn spring-boot:run
```

**Look for these messages in console:**

```
...
2025-11-28 10:30:45 INFO  HikariPool - HikariPool-1 - Starting...
2025-11-28 10:30:46 INFO  HikariPool - HikariPool-1 - Started
...
🚀 Spring Boot + MySQL VIT Result API started on http://localhost:8080
...
Hibernate: create table student_results (...)
```

**If you see these, database connection is successful!**

#### Step 6.2: Test API Connection

Open a new terminal:

```bash
# Test GET endpoint
curl http://localhost:8080/api/results/all

# Should return empty array: []

# Test POST endpoint
curl -X POST http://localhost:8080/api/results/add \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "John Doe",
    "rollNo": "123456",
    "annMse": 25,
    "annEse": 60,
    "cntMse": 28,
    "cntEse": 65,
    "daaMse": 30,
    "daaEse": 70,
    "ccMse": 20,
    "ccEse": 50
  }'

# Should return the saved object with an ID
```

---

### **Phase 7: Database Management Commands**

#### Common MySQL Commands:

```bash
# Login to MySQL
sudo mysql -u root -p

# List all databases
mysql> SHOW DATABASES;

# Select a database
mysql> USE student_db;

# List all tables
mysql> SHOW TABLES;

# View table structure
mysql> DESCRIBE student_results;

# View all data
mysql> SELECT * FROM student_results;

# View specific columns
mysql> SELECT student_name, roll_no FROM student_results;

# Count total records
mysql> SELECT COUNT(*) FROM student_results;

# Delete all records (careful!)
mysql> DELETE FROM student_results;

# Drop entire table (careful!)
mysql> DROP TABLE student_results;

# Exit MySQL
mysql> EXIT;
```

#### Backup Database:

```bash
# Backup to file
mysqldump -u root -p student_db > student_db_backup.sql

# Enter password: Ritesh2799@

# Restore from backup
mysql -u root -p student_db < student_db_backup.sql

# Enter password: Ritesh2799@
```

---

### **Phase 8: Troubleshooting**

#### Issue 1: MySQL Service Won't Start

```bash
# Check MySQL status
sudo service mysql status

# If not running, try:
sudo service mysql start

# Check error logs
sudo tail -f /var/log/mysql/error.log
```

#### Issue 2: "Access Denied" Error

```bash
# Reset root password
sudo mysql -u root

# In MySQL shell:
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Ritesh2799@';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

#### Issue 3: Port Already in Use (3306)

```bash
# Check what's using port 3306
sudo lsof -i :3306

# Kill the process (if safe)
sudo kill -9 <PID>

# Or restart MySQL
sudo systemctl restart mysql
```

#### Issue 4: Spring Boot Can't Connect to Database

**Check application.properties:**
```bash
# Verify connection string
cat backend/src/main/resources/application.properties | grep datasource

# Should show correct host, port, database name, username, password
```

**Verify MySQL is running:**
```bash
sudo service mysql status
```

**Test connection manually:**
```bash
mysql -h localhost -u root -p -D student_db
```

#### Issue 5: "No Database Selected" Error

```bash
# Always select database first
USE student_db;

# Then run queries
```

---

### **Phase 9: Quick Setup Checklist**

- [ ] MySQL installed: `mysql --version`
- [ ] MySQL running: `sudo service mysql status`
- [ ] Database created: `USE student_db;`
- [ ] Tables created: `SHOW TABLES;`
- [ ] application.properties updated with correct credentials
- [ ] Backend builds: `mvn clean install`
- [ ] Backend starts: `mvn spring-boot:run`
- [ ] API responds: `curl http://localhost:8080/api/results/all`
- [ ] Frontend installs: `npm install`
- [ ] Frontend runs: `npm run dev`
- [ ] Can add result via UI
- [ ] Results persist in database

---

### **Phase 10: Complete Flow**

```
1. Install MySQL
   ↓
2. Secure MySQL (set password)
   ↓
3. Create database 'student_db'
   ↓
4. Create tables in database
   ↓
5. Update application.properties with DB credentials
   ↓
6. Build backend with Maven
   ↓
7. Run backend (Spring Boot connects to DB)
   ↓
8. Install frontend dependencies
   ↓
9. Run frontend
   ↓
10. Open http://localhost:5173
    ↓
11. Add/View student results
    ↓
12. Data gets saved to MySQL database
```

---

### **Summary Table**

| Task | Command | Success Indicator |
|------|---------|-------------------|
| Install MySQL | `sudo apt install mysql-server` | `mysql --version` works |
| Start MySQL | `sudo service mysql start` | `active (running)` |
| Login | `sudo mysql -u root -p` | `mysql>` prompt |
| Create DB | `CREATE DATABASE student_db;` | `SHOW DATABASES;` shows it |
| Create Tables | Run SQL file or manual commands | `SHOW TABLES;` shows tables |
| Test Connection | Start backend | No connection errors |
| Test API | `curl http://localhost:8080/api/results/all` | Returns `[]` |
| Add Data | Use React UI or curl | Data appears in DB |
| View Data | `SELECT * FROM student_results;` | Records visible |

You now have a fully functional MySQL database setup for the VIT Result Management System!


### Running the Application

#### Terminal 1: Start Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

#### Terminal 2: Start Frontend (Vite Dev Server)
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

#### Access the Application
Open your browser and visit:
- **Frontend**: `http://localhost:5173`
- **API Docs**: `http://localhost:8080/api/results` (test endpoint)

### VS Code Setup (Ubuntu)

#### 1. Install Required Extensions
Open VS Code Extensions (Ctrl+Shift+X) and install:
- **Extension Pack for Java** (Microsoft)
- **Spring Boot Extension Pack** (VMware)
- **ES7+ React/Redux/React-Native snippets** (dsznajder)
- **REST Client** (Huachao Mao)
- **Thunder Client** or **Postman** (for API testing)

#### 2. Open the Project in VS Code
```bash
code .
```

#### 3. Setup Java Configuration
VS Code will auto-detect Java 17. If not:
- Press `Ctrl+Shift+P`
- Search "Java: Configure Java Runtime"
- Select Java 17

#### 4. Debug Backend in VS Code
- Open `.vscode/launch.json` (or create if missing)
- Add the following configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Spring Boot App",
      "type": "java",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "mainClass": "app.Application",
      "projectName": "vit-result",
      "args": ""
    }
  ]
}
```

Then press F5 to start debugging.

#### 5. Frontend Development
- The frontend runs in Vite's development mode with hot reload
- Edit files in `frontend/src/` and changes will reflect instantly
- Press `Ctrl+Shift+J` to open the browser dev console

### Project Structure
```
.
├── backend/                    # Spring Boot application
│   ├── pom.xml                 # Maven dependencies
│   ├── src/main/java/app/      # Java source code
│   │   ├── Application.java
│   │   ├── ResultController.java
│   │   ├── StudentRepository.java
│   │   └── StudentResult.java
│   └── src/main/resources/     # Config files
│       └── application.properties
├── frontend/                   # React application
│   ├── package.json            # npm dependencies
│   ├── vite.config.js          # Vite configuration
│   └── src/                    # React components
│       ├── App.jsx
│       ├── main.jsx
│       └── App.css
└── README.md                   # This file
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/results` | Get all student results |
| GET | `/api/results/{id}` | Get result by ID |
| POST | `/api/results` | Create new result |
| PUT | `/api/results/{id}` | Update result |
| DELETE | `/api/results/{id}` | Delete result |

### Troubleshooting

#### Backend won't start
- Ensure MySQL is running: `sudo service mysql status`
- Check database credentials in `application.properties`
- Verify Java 17 is installed: `java -version`
- Check port 8080 is not in use: `sudo lsof -i :8080`

#### Frontend won't connect to backend
- Ensure backend is running on port 8080
- Check if CORS is configured correctly (if needed, update `ResultController.java`)
- Verify frontend and backend are on correct ports

#### MySQL connection issues
- Restart MySQL: `sudo service mysql restart`
- Check MySQL is listening: `sudo netstat -tlnp | grep mysql`

#### NPM dependencies issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Building for Production

#### Build Backend JAR
```bash
cd backend
mvn clean package
java -jar target/vit-result-0.0.1-SNAPSHOT.jar
```

#### Build Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Environment Variables (Optional for Production)
Create `.env` files for different environments:

**backend/.env** (if needed for external configs)
**frontend/.env** (for API endpoint)
```
VITE_API_URL=http://localhost:8080
```

### Git Workflow
```bash
# Create a new branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to remote
git push origin feature/your-feature
```

## Support & Issues
If you encounter any issues:
1. Check the Troubleshooting section above
2. Verify all prerequisites are installed
3. Check the terminal output for error messages
4. Ensure database is properly configured

---

# Code Explanation - Line by Line

## Backend Code

### 1. Application.java - Entry Point

```java
package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("🚀 Spring Boot + MySQL VIT Result API started on http://localhost:8080");
    }
}
```

**Line-by-Line Explanation:**

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `package app;` | Declares the package name for organizing code |
| 3-4 | `import org.springframework.boot.*;` | Imports Spring Boot framework classes |
| 6 | `@SpringBootApplication` | **Annotation** that tells Spring Boot this is the main application class. Enables auto-configuration and component scanning |
| 7 | `public class Application {` | Declares the public class that serves as application entry point |
| 8 | `public static void main(String[] args) {` | **Main method** - Java starts here. `static` means it runs without creating an object instance |
| 9 | `SpringApplication.run(Application.class, args);` | **Starts the Spring Boot server** on port 8080. Initializes the entire framework |
| 10 | `System.out.println(...)` | Prints a startup message to console confirming the server is running |
| 11 | `}` | Closes main method |
| 12 | `}` | Closes Application class |

**What it does:** This is the **entry point** of your backend. When you run the application, Java executes the `main()` method, which starts the Spring Boot server on port 8080.

---

### 2. StudentResult.java - Data Model

```java
package app;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "student_results")
public class StudentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "student_name", nullable = false)
    private String studentName;

    @NotBlank
    @Column(name = "roll_no", nullable = false)
    private String rollNo;

    @Min(0) @Max(30)
    @Column(name = "ann_mse")
    private double annMse;
    
    @Min(0) @Max(70)
    @Column(name = "ann_ese")
    private double annEse;

    @Min(0) @Max(30)
    @Column(name = "cnt_mse")
    private double cntMse;
    
    @Min(0) @Max(70)
    @Column(name = "cnt_ese")
    private double cntEse;

    @Min(0) @Max(30)
    @Column(name = "daa_mse")
    private double daaMse;
    
    @Min(0) @Max(70)
    @Column(name = "daa_ese")
    private double daaEse;

    @Min(0) @Max(30)
    @Column(name = "cc_mse")
    private double ccMse;
    
    @Min(0) @Max(70)
    @Column(name = "cc_ese")
    private double ccEse;

    // Total marks calculated properties
    @Transient
    public double getAnnTotal() { return annMse + annEse; }
    
    @Transient
    public double getCntTotal() { return cntMse + cntEse; }
    
    @Transient
    public double getDaaTotal() { return daaMse + daaEse; }
    
    @Transient
    public double getCcTotal() { return ccMse + ccEse; }
}
```

**Line-by-Line Explanation:**

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `package app;` | Package declaration |
| 3-4 | `import jakarta.persistence.*;` | Imports JPA (Java Persistence API) for database mapping |
| 5 | `import jakarta.validation.constraints.*;` | Imports validation annotations for data validation |
| 7 | `@Entity` | **Annotation** - Marks this class as a JPA entity (represents a database table) |
| 8 | `@Table(name = "student_results")` | **Annotation** - Maps this class to `student_results` table in MySQL |
| 9 | `public class StudentResult {` | Declares the entity class |
| 10-11 | `@Id @GeneratedValue(...)` | `@Id` marks `id` as primary key. `@GeneratedValue` auto-increments it (1, 2, 3...) |
| 12 | `private Long id;` | Primary key field - unique identifier for each record |
| 14-15 | `@NotBlank` | **Validation** - ensures student name is not empty before saving |
| 16 | `@Column(name = "student_name", nullable = false)` | Maps to `student_name` column. `nullable=false` means value is required |
| 17 | `private String studentName;` | Stores student's name |
| 19-22 | Similar annotations | `rollNo` - Student's roll number with validation |
| 24-25 | `@Min(0) @Max(30)` | **Validation** - MSE marks must be between 0 and 30 |
| 26 | `@Column(name = "ann_mse")` | Maps to `ann_mse` column in database |
| 27 | `private double annMse;` | Stores ANN (Artificial Neural Networks) Mid-Semester Exam marks |
| 29-30 | `@Min(0) @Max(70)` | ESE marks must be between 0 and 70 |
| 32 | `private double annEse;` | Stores ANN End-Semester Exam marks |
| 34-55 | Repeated for other subjects | Similar fields for CNT, DAA, and CC subjects |
| 57-62 | `@Transient public double getAnnTotal()` | `@Transient` - **NOT stored in database**. Calculates total marks on-the-fly (MSE + ESE). Useful for frontend display |

**What it does:** This class **maps to the `student_results` table** in MySQL. Each field represents a column. Annotations handle validation and database mapping automatically.

---

### 3. StudentRepository.java - Database Access

```java
package app;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentResult, Long> {
}
```

**Line-by-Line Explanation:**

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `package app;` | Package declaration |
| 3 | `import org.springframework.data.jpa.repository.JpaRepository;` | Imports JpaRepository interface from Spring Data |
| 5 | `public interface StudentRepository` | **Interface** - defines contract for database operations |
| 5 | `extends JpaRepository<StudentResult, Long>` | Inherits from JpaRepository. `<StudentResult, Long>` means: handle StudentResult entities with Long type IDs |

**Built-in methods inherited from JpaRepository:**

| Method | SQL Generated | Purpose |
|--------|---------------|---------|
| `save(StudentResult)` | `INSERT INTO student_results ...` | Add new record |
| `findAll()` | `SELECT * FROM student_results` | Get all records |
| `findById(Long id)` | `SELECT * FROM student_results WHERE id = ?` | Get one record by ID |
| `deleteById(Long id)` | `DELETE FROM student_results WHERE id = ?` | Delete by ID |
| `update(StudentResult)` | `UPDATE student_results ...` | Modify record |

**What it does:** This **interface provides pre-built database CRUD operations**. No implementation needed - Spring Boot generates them automatically at runtime.

---

### 4. ResultController.java - REST API

```java
package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    @Autowired
    private StudentRepository repo;

    @PostMapping("/add")
    public StudentResult addResult(@Valid @RequestBody StudentResult result) {
        return repo.save(result);
    }

    @GetMapping("/all")
    public List<StudentResult> getAll() {
        return repo.findAll();
    }
}
```

**Line-by-Line Explanation:**

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `package app;` | Package declaration |
| 3-6 | `import ...` | Import necessary classes for REST, validation, and dependency injection |
| 8 | `@RestController` | **Annotation** - Marks this class as REST API controller. Auto-converts return values to JSON |
| 9 | `@RequestMapping("/api/results")` | **Base URL path** for all endpoints in this class. All endpoints start with `/api/results` |
| 10 | `@CrossOrigin(origins = "http://localhost:5173")` | **CORS configuration** - Allows React frontend (port 5173) to make requests to this backend (port 8080) |
| 11 | `public class ResultController {` | Declares controller class |
| 13-14 | `@Autowired private StudentRepository repo;` | **Dependency Injection** - Automatically injects StudentRepository bean. `@Autowired` means Spring creates it for us |
| 16 | `@PostMapping("/add")` | **HTTP POST endpoint** - Full URL: `POST http://localhost:8080/api/results/add` |
| 17 | `public StudentResult addResult(...)` | Method receives result data from frontend |
| 17 | `@Valid` | **Validation** - Validates StudentResult object before saving. Checks `@NotBlank`, `@Min`, `@Max` annotations |
| 17 | `@RequestBody StudentResult result` | **Annotation** - Converts incoming JSON from frontend into StudentResult Java object |
| 18 | `return repo.save(result);` | Saves to database using repository. Returns saved object (with auto-generated ID) back to frontend |
| 20 | `@GetMapping("/all")` | **HTTP GET endpoint** - Full URL: `GET http://localhost:8080/api/results/all` |
| 21 | `public List<StudentResult> getAll()` | Fetches all records from database |
| 22 | `return repo.findAll();` | Calls repository's findAll() method. Returns list of all StudentResult objects as JSON |
| 24 | `}` | Closes controller class |

**What it does:** This controller handles **HTTP requests from the React frontend**. It defines two API endpoints:
1. **POST `/api/results/add`** - Save new student result
2. **GET `/api/results/all`** - Fetch all student results

---

## Frontend Code

### 1. App.jsx - React Component

```jsx
import React, { useState, useEffect } from 'react'
import './App.css'

const subjects = [
  { code: 'ANN', name: 'Artificial Neural Networks' },
  { code: 'CNT', name: 'Computer Networks' },
  { code: 'DAA', name: 'Design & Analysis of Algorithms' },
  { code: 'CC', name: 'Cloud Computing' }
]

export default function App() {
  // State Management
  const [activeTab, setActiveTab] = useState('add')
  const [form, setForm] = useState({
    studentName: '', rollNo: '',
    annMse: '', annEse: '',
    cntMse: '', cntEse: '',
    daaMse: '', daaEse: '',
    ccMse: '', ccEse: ''
  })
  const [result, setResult] = useState(null)
  const [allResults, setAllResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch results when tab changes
  useEffect(() => {
    if (activeTab === 'view') {
      fetch('http://localhost:8080/api/results/all')
        .then(res => res.json())
        .then(data => setAllResults(data))
    }
  }, [activeTab])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('http://localhost:8080/api/results/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setResult(data)
    setForm({
      studentName: '', rollNo: '',
      annMse: '', annEse: '',
      cntMse: '', cntEse: '',
      daaMse: '', daaEse: '',
      ccMse: '', ccEse: ''
    })
    setLoading(false)
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }))
  }

  return (
    <div className="app-container">
      <h1 className="app-title">VIT Results Portal</h1>

      <div className="tabs">
        <button className={activeTab === 'add' ? 'tab active' : 'tab'} 
                onClick={() => setActiveTab('add')}>
          Add Result
        </button>
        <button className={activeTab === 'view' ? 'tab active' : 'tab'} 
                onClick={() => setActiveTab('view')}>
          View All Results
        </button>
      </div>

      {activeTab === 'add' ? (
        <div className="card">
          <h2>Enter Student Results</h2>
          <form onSubmit={handleSubmit}>
            {/* Student name and roll number inputs */}
            <div className="form-row">
              <input 
                type="text" 
                name="studentName" 
                value={form.studentName} 
                onChange={handleChange} 
                placeholder="Student Name" 
                required 
              />
              <input 
                type="text" 
                name="rollNo" 
                value={form.rollNo} 
                onChange={handleChange} 
                placeholder="Roll Number" 
                required 
              />
            </div>

            {/* Dynamic subject marks inputs */}
            {subjects.map((sub) => {
              const mseKey = sub.code.toLowerCase() + 'Mse'
              const eseKey = sub.code.toLowerCase() + 'Ese'
              return (
                <div key={sub.code} className="form-row">
                  <label>{sub.code} - {sub.name}</label>
                  <input 
                    type="number" 
                    name={mseKey} 
                    value={form[mseKey]} 
                    onChange={handleChange} 
                    placeholder="MSE (0-30)" 
                    min="0" 
                    max="30" 
                    step="0.01" 
                  />
                  <input 
                    type="number" 
                    name={eseKey} 
                    value={form[eseKey]} 
                    onChange={handleChange} 
                    placeholder="ESE (0-70)" 
                    min="0" 
                    max="70" 
                    step="0.01" 
                  />
                </div>
              )
            })}

            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Result'}
            </button>
          </form>

          {result && (
            <div className="result-card">
              <h3>{result.studentName} - {result.rollNo}</h3>
              <div className="subjects">
                <div className="subject"><span>ANN:</span><span>{result.annTotal.toFixed(2)}</span></div>
                <div className="subject"><span>CNT:</span><span>{result.cntTotal.toFixed(2)}</span></div>
                <div className="subject"><span>DAA:</span><span>{result.daaTotal.toFixed(2)}</span></div>
                <div className="subject"><span>CC:</span><span>{result.ccTotal.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <h2>All Student Results</h2>
          {allResults.length === 0 ? (
            <p>No results found</p>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>ANN</th>
                  <th>CNT</th>
                  <th>DAA</th>
                  <th>CC</th>
                </tr>
              </thead>
              <tbody>
                {allResults.map(res => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.studentName}</td>
                    <td>{res.rollNo}</td>
                    <td>{res.annTotal.toFixed(2)}</td>
                    <td>{res.cntTotal.toFixed(2)}</td>
                    <td>{res.daaTotal.toFixed(2)}</td>
                    <td>{res.ccTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
```

**Line-by-Line Explanation:**

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `import React, { useState, useEffect } from 'react'` | Imports React library and two **hooks**: `useState` (state management) and `useEffect` (side effects like API calls) |
| 2 | `import './App.css'` | Imports CSS styling for this component |
| 4-8 | `const subjects = [...]` | Defines an array of subject objects. Used in `.map()` to generate form fields dynamically |
| 10 | `export default function App()` | **Exports** main component as default. This is what gets rendered in the browser |
| 12 | `const [activeTab, setActiveTab] = useState('add')` | **State hook** - Stores which tab is active ('add' or 'view'). Updates UI when changed |
| 13-20 | `const [form, setForm] = useState({...})` | **State hook** - Stores all form input values. Updates as user types |
| 21 | `const [result, setResult] = useState(null)` | **State hook** - Stores the result after form submission (for showing confirmation) |
| 22 | `const [allResults, setAllResults] = useState([])` | **State hook** - Stores list of all student results fetched from backend |
| 23 | `const [loading, setLoading] = useState(false)` | **State hook** - Tracks if form is being submitted (for button disable state) |
| 25-31 | `useEffect(() => { ... }, [activeTab])` | **Effect hook** - Runs when `activeTab` changes. If 'view' tab clicked, fetches all results from backend |
| 26 | `fetch('http://localhost:8080/api/results/all')` | **Calls backend API** - GET request to fetch all student results |
| 27 | `.then(res => res.json())` | Converts response stream to JSON object |
| 28 | `.then(data => setAllResults(data))` | Stores fetched data in state for display |
| 32-46 | `const handleSubmit = async (e) => { ... }` | **Event handler** - Called when form is submitted |
| 33 | `e.preventDefault()` | Prevents page reload on form submission |
| 34 | `setLoading(true)` | Shows "Saving..." text on button |
| 35-40 | `fetch(...POST...)` | **Calls backend API** - POST request to save result. Sends form data as JSON |
| 41 | `const data = await res.json()` | Waits for response and converts to JSON |
| 42 | `setResult(data)` | Stores returned result to show confirmation |
| 43-50 | `setForm({...})` | **Clears form** - resets all input fields to empty strings |
| 51 | `setLoading(false)` | Shows "Save Result" text again on button |
| 53-56 | `const handleChange = (e) => { ... }` | **Event handler** - Called every time user types in an input field |
| 54 | `const { name, value } = e.target` | **Destructuring** - Extracts field name and value from input element |
| 55 | `setForm(prev => ({ ...prev, [name]: value }))` | **Spread operator** - Updates form state. `[name]` dynamically updates the correct field |
| 57 | `return (...)` | **Returns JSX** - All HTML-like code below this is rendered in browser |
| 58 | `<div className="app-container">` | Container div with CSS class for styling |
| 59 | `<h1 className="app-title">VIT Results Portal</h1>` | Page title |
| 61-70 | Tab buttons | Two buttons to switch between "Add Result" and "View All Results" views |
| 72 | `{activeTab === 'add' ? ( ... ) : ( ... )}` | **Conditional rendering** - Shows form if 'add' tab, table if 'view' tab |
| 80-91 | Student name/roll number inputs | Input fields bound to form state |
| 93-106 | `{subjects.map(...)}` | **Loop** - For each subject, creates MSE and ESE input fields dynamically |
| 109-111 | Submit button | Button disabled while loading |
| 113-126 | Confirmation display | Shows submitted result details if form was successful |
| 128-161 | Results table | Shows all student results fetched from backend |

**What it does:** Main React component with:
- State for form data, active tab, and results
- Functions to fetch data and submit forms
- Conditional rendering of "Add" vs "View" tabs
- Dynamic form generation using `.map()`

---

### 2. App.css - Styling

```css
:root {
    --primary: #667eea;           /* Purple color for brand */
    --bg: #f5f7fa;                /* Light gray for page background */
    --card-bg: white;             /* White for card containers */
    --text: #2d3748;              /* Dark gray for text */
    --border: #e2e8f0;            /* Light border color */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;   /* Modern font */
    background: var(--bg);              /* Use CSS variable */
    color: var(--text);
    padding: 20px;
}

.app-container {
    max-width: 1200px;          /* Max width for large screens */
    margin: 0 auto;             /* Center content */
}

.app-title {
    text-align: center;
    color: var(--primary);      /* Purple title */
    margin-bottom: 30px;
    font-size: 2rem;            /* Large heading */
}

.tabs {
    display: flex;              /* Side-by-side layout */
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;    /* Center tabs */
}

.tab {
    padding: 12px 24px;         /* Padding inside button */
    background: white;
    border: 2px solid var(--border);
    border-radius: 8px;         /* Rounded corners */
    cursor: pointer;            /* Change cursor on hover */
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;       /* Smooth animation */
}

.tab.active {
    background: var(--primary); /* Purple when selected */
    color: white;
    border-color: var(--primary);
}

.tab:hover {
    border-color: var(--primary);
}

.card {
    background: var(--card-bg);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);   /* Subtle shadow */
    margin-bottom: 20px;
}

.card h2 {
    margin-bottom: 20px;
    color: var(--text);
}

form {
    display: flex;
    flex-direction: column;     /* Stack form fields vertically */
    gap: 15px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;     /* Two equal columns */
    gap: 10px;
    align-items: center;
}

.form-row label {
    grid-column: 1 / -1;        /* Label spans both columns */
    font-weight: 600;
    color: var(--primary);
    font-size: 0.9rem;
}

input {
    padding: 10px;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;     /* Smooth color change */
}

input:focus {
    outline: none;
    border-color: var(--primary);      /* Purple border when focused */
}

button {
    padding: 12px 24px;
    background: var(--primary);        /* Purple button */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover:not(:disabled) {
    background: #5568d3;               /* Darker purple on hover */
}

button:disabled {
    opacity: 0.6;                      /* Faded when disabled */
    cursor: not-allowed;
}

.result-card {
    background: #f0f4ff;               /* Light purple background */
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    border-left: 4px solid var(--primary);
}

.result-card h3 {
    margin-bottom: 15px;
    color: var(--primary);
}

.subjects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);  /* Two columns for subjects */
    gap: 15px;
}

.subject {
    display: flex;
    justify-content: space-between;    /* Space between label and value */
    padding: 10px;
    background: white;
    border-radius: 6px;
}

.results-table {
    width: 100%;
    border-collapse: collapse;         /* Remove table borders gap */
}

.results-table th {
    background: var(--primary);        /* Purple header */
    color: white;
    padding: 12px;
    text-align: left;
}

.results-table td {
    padding: 12px;
    border-bottom: 1px solid var(--border);
}

.results-table tr:hover {
    background: var(--bg);             /* Highlight on hover */
}

@media (max-width: 768px) {
    /* Mobile responsive styles */
    .form-row {
        grid-template-columns: 1fr;    /* Single column on mobile */
    }
    
    .subjects {
        grid-template-columns: 1fr;    /* Single column for subjects */
    }
}
```

**Key CSS Concepts:**

| Concept | Example | Explanation |
|---------|---------|-------------|
| **CSS Variables** | `--primary: #667eea` | Define once, use everywhere with `var(--primary)` |
| **Flexbox** | `display: flex; justify-content: center;` | Align items side-by-side or centered |
| **Grid** | `grid-template-columns: 1fr 1fr;` | Create 2-column layout for form |
| **Transitions** | `transition: all 0.3s;` | Smooth animation over 0.3 seconds |
| **Pseudo-classes** | `:hover`, `:focus`, `:disabled` | Style based on user interaction |
| **Media Queries** | `@media (max-width: 768px)` | Responsive design for mobile |
| **Box Shadow** | `box-shadow: 0 2px 8px rgba(...)` | Create depth effect |

---

## Data Flow Summary

### Adding a Result:
```
User types in form
    ↓
onChange event → handleChange() → setForm() updates state
    ↓
User clicks "Save Result"
    ↓
onSubmit event → handleSubmit() → POST to /api/results/add
    ↓
Backend receives JSON
    ↓
ResultController.addResult() validates @Valid data
    ↓
StudentRepository.save() inserts into MySQL
    ↓
Backend returns saved object with ID
    ↓
Frontend receives JSON → setResult() displays confirmation
```

### Viewing Results:
```
User clicks "View All Results" tab
    ↓
activeTab state changes → useEffect triggers
    ↓
fetch() → GET /api/results/all
    ↓
Backend queries database via StudentRepository.findAll()
    ↓
MySQL returns all student records
    ↓
Backend converts to JSON list
    ↓
Frontend receives → setAllResults() stores in state
    ↓
.map() renders table with all results
```

---

## Key Concepts Explained

### 1. **React Hooks**
- **useState**: Manage component state. Updates trigger re-render
- **useEffect**: Run code after render. Great for API calls

### 2. **Event Handling**
- onChange, onSubmit, onClick trigger handler functions
- Handlers update state → UI re-renders automatically

### 3. **Fetch API**
- `fetch(url)` makes HTTP requests to backend
- `.then()` chains handle response asynchronously

### 4. **Validation**
- Frontend: `type="number" min="0" max="30"` restricts input
- Backend: `@Valid @NotBlank @Min(0) @Max(30)` validates before saving

### 5. **Dependency Injection**
- `@Autowired` automatically injects dependencies
- Spring manages object creation and lifecycle

### 6. **CORS**
- `@CrossOrigin(origins = "http://localhost:5173")` allows cross-origin requests
- Enables frontend (port 5173) to call backend (port 8080)

### 7. **REST API Design**
- GET: Retrieve data (read-only)
- POST: Create new data
- PUT: Update existing data
- DELETE: Remove data
