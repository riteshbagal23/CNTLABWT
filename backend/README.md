# VIT Result Application - Quick Start Guide

## 📚 How to Run This Application

### Prerequisites
- ✅ MySQL Server installed and running
- ✅ Java 17 or higher
- ✅ Maven installed

### Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
cd /Users/ritesh/Desktop/Springboot/backend
./run.sh
```

This script will:
1. Create the MySQL database
2. Build the application
3. Start the server

### Option 2: Manual Setup

#### Step 1: Create Database

```bash
mysql -u root -p
```

Enter your password, then run:

```sql
CREATE DATABASE IF NOT EXISTS student_db;
EXIT;
```

#### Step 2: Build the Application

```bash
cd /Users/ritesh/Desktop/Springboot/backend
mvn clean install
```

#### Step 3: Run the Application

```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8080**

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api/results
```

### 1. Add Student Result

**Endpoint:** `POST /api/results/add`

**Request:**
```bash
curl -X POST http://localhost:8080/api/results/add \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Your Name",
    "rollNo": "21BCE001",
    "mse1": 25,
    "mse2": 28,
    "mse3": 27,
    "mse4": 26,
    "ese1": 65,
    "ese2": 68,
    "ese3": 62,
    "ese4": 70
  }'
```

**Response:**
```json
{
  "id": 1,
  "studentName": "Your Name",
  "rollNo": "21BCE001",
  "totalMarks": 217.3,
  "cgpa": 5.4325
}
```

### 2. Get All Results

**Endpoint:** `GET /api/results/all`

**Request:**
```bash
curl http://localhost:8080/api/results/all
```

**Response:**
```json
[
  {
    "id": 1,
    "studentName": "Your Name",
    "rollNo": "21BCE001",
    "totalMarks": 217.3,
    "cgpa": 5.4325
  }
]
```

---

## 🗄️ Database Access

### View Data in MySQL

```bash
mysql -u root -p
```

```sql
USE student_db;
SELECT * FROM student_results;
```

### Table Structure

```sql
DESCRIBE student_results;
```

---

## 🛠️ Configuration

### Database Connection

Edit `application.properties` if you need to change database settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=Ritesh2799@
```

### Server Port

Default port is **8080**. To change:

```properties
server.port=9090
```

---

## 📊 Score Calculation

- **MSE (Mid-Semester Exam):** Max 30 marks each (4 subjects)
- **ESE (End-Semester Exam):** Max 70 marks each (4 subjects)

**Total Marks Formula:**
```
Total = (MSE1 × 0.3 + ESE1 × 0.7) + ... + (MSE4 × 0.3 + ESE4 × 0.7)
Max Total = 400 marks
```

**CGPA Formula:**
```
CGPA = (Total Marks / 400) × 10
```

---

## 🚀 Next Steps

1. **Test the API** using the curl commands above
2. **Connect a frontend** (React/Angular/Vue) to the API
3. **Add more features:**
   - Search by roll number
   - Update student results
   - Delete records
   - Generate reports
   - Export to PDF/Excel

---

## ❓ Troubleshooting

### MySQL Connection Error

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:** Check your MySQL password in `application.properties`

### Port Already in Use

**Error:** `Port 8080 is already in use`

**Solution:** 
1. Stop the existing process on port 8080
2. Or change the port in `application.properties`

### Table Not Created

**Solution:** Check that `spring.jpa.hibernate.ddl-auto=update` is set in `application.properties`

---

## 📝 Files Created

- [setup_database.sql](file:///Users/ritesh/Desktop/Springboot/backend/setup_database.sql) - SQL script to create database
- [run.sh](file:///Users/ritesh/Desktop/Springboot/backend/run.sh) - Automated setup and run script
- [README.md](file:///Users/ritesh/Desktop/Springboot/backend/README.md) - This guide

---

## 🎓 Learning Resources

### MongoDB vs MySQL Comparison

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| Type | NoSQL (Document) | SQL (Relational) |
| Schema | Flexible | Fixed |
| Learning Curve | Easier | Moderate |
| Queries | JSON-like | SQL |
| Relationships | Manual | Built-in (JOINs) |
| Best For | Rapid prototyping | Structured data |

### Why We Chose MySQL

✅ Local control (no cloud dependency)  
✅ Industry standard (more job opportunities)  
✅ Structured data with validation  
✅ Better for learning SQL  
✅ Free and open source  

---

**Happy Coding! 🚀**
