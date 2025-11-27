# VIT Student Result Management System - Complete Code Reference

A full-stack application for managing VIT semester results with Spring Boot backend and React frontend.

## 📋 Table of Contents
- [Project Structure](#project-structure)
- [Backend Code](#backend-code)
- [Frontend Code](#frontend-code)
- [Database Setup](#database-setup)
- [Configuration Files](#configuration-files)
- [How to Run](#how-to-run)

---

## 🗂️ Project Structure

```
Springboot/
├── backend/
│   ├── src/main/java/app/
│   │   ├── Application.java
│   │   ├── StudentResult.java
│   │   ├── StudentRepository.java
│   │   └── ResultController.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   ├── setup_database.sql
│   └── create_table.sql
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🔧 Backend Code

### 1. Application.java
**Location:** `backend/src/main/java/app/Application.java`

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

---

### 2. StudentResult.java (Entity Model)
**Location:** `backend/src/main/java/app/StudentResult.java`

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

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public double getAnnMse() { return annMse; }
    public void setAnnMse(double annMse) { this.annMse = annMse; }
    
    public double getAnnEse() { return annEse; }
    public void setAnnEse(double annEse) { this.annEse = annEse; }

    public double getCntMse() { return cntMse; }
    public void setCntMse(double cntMse) { this.cntMse = cntMse; }
    
    public double getCntEse() { return cntEse; }
    public void setCntEse(double cntEse) { this.cntEse = cntEse; }

    public double getDaaMse() { return daaMse; }
    public void setDaaMse(double daaMse) { this.daaMse = daaMse; }
    
    public double getDaaEse() { return daaEse; }
    public void setDaaEse(double daaEse) { this.daaEse = daaEse; }

    public double getCcMse() { return ccMse; }
    public void setCcMse(double ccMse) { this.ccMse = ccMse; }
    
    public double getCcEse() { return ccEse; }
    public void setCcEse(double ccEse) { this.ccEse = ccEse; }

    // Calculate subject total (MSE is out of 30, ESE is out of 70, total = 100)
    public double getAnnTotal() {
        return annMse + annEse;
    }

    public double getCntTotal() {
        return cntMse + cntEse;
    }

    public double getDaaTotal() {
        return daaMse + daaEse;
    }

    public double getCcTotal() {
        return ccMse + ccEse;
    }

    public double getTotalMarks() {
        return getAnnTotal() + getCntTotal() + getDaaTotal() + getCcTotal();
    }
}
```

---

### 3. StudentRepository.java (JPA Repository)
**Location:** `backend/src/main/java/app/StudentRepository.java`

```java
package app;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentResult, Long> {
}
```

---

### 4. ResultController.java (REST Controller)
**Location:** `backend/src/main/java/app/ResultController.java`

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

---

## ⚛️ Frontend Code

### 1. App.jsx (Main React Component)
**Location:** `frontend/src/App.jsx`

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

  useEffect(() => {
    if (activeTab === 'view') {
      fetch('http://localhost:8080/api/results/all')
        .then(res => res.json())
        .then(data => setAllResults(data))
    }
  }, [activeTab])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }))
  }

  return (
    <div className="app-container">
      <h1 className="app-title">VIT Results Portal</h1>

      <div className="tabs">
        <button className={activeTab === 'add' ? 'tab active' : 'tab'} onClick={() => setActiveTab('add')}>
          Add Result
        </button>
        <button className={activeTab === 'view' ? 'tab active' : 'tab'} onClick={() => setActiveTab('view')}>
          View All Results
        </button>
      </div>

      {activeTab === 'add' ? (
        <div className="card">
          <h2>Enter Student Results</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" required />
              <input type="text" name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll Number" required />
            </div>

            {subjects.map((sub) => {
              const mseKey = sub.code.toLowerCase() + 'Mse'
              const eseKey = sub.code.toLowerCase() + 'Ese'
              return (
                <div key={sub.code} className="form-row">
                  <label>{sub.code} - {sub.name}</label>
                  <input type="number" name={mseKey} value={form[mseKey]} onChange={handleChange} placeholder="MSE (0-30)" min="0" max="30" step="0.01" />
                  <input type="number" name={eseKey} value={form[eseKey]} onChange={handleChange} placeholder="ESE (0-70)" min="0" max="70" step="0.01" />
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
              <div className="total"><strong>Total: {result.totalMarks.toFixed(2)} / 400</strong></div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <h2>All Student Results</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>ANN</th>
                  <th>CNT</th>
                  <th>DAA</th>
                  <th>CC</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {allResults.map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentName}</td>
                    <td>{r.rollNo}</td>
                    <td>{r.annTotal.toFixed(2)}</td>
                    <td>{r.cntTotal.toFixed(2)}</td>
                    <td>{r.daaTotal.toFixed(2)}</td>
                    <td>{r.ccTotal.toFixed(2)}</td>
                    <td><strong>{r.totalMarks.toFixed(2)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

### 2. main.jsx (React Entry Point)
**Location:** `frontend/src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### 3. App.css (Styles)
**Location:** `frontend/src/App.css`

```css
:root {
    --primary: #667eea;
    --bg: #f5f7fa;
    --card-bg: white;
    --text: #2d3748;
    --border: #e2e8f0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text);
    padding: 20px;
}

.app-container {
    max-width: 1200px;
    margin: 0 auto;
}

.app-title {
    text-align: center;
    color: var(--primary);
    margin-bottom: 30px;
    font-size: 2rem;
}

.tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

.tab {
    padding: 12px 24px;
    background: white;
    border: 2px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
}

.tab.active {
    background: var(--primary);
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-bottom: 20px;
    color: var(--text);
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
}

.form-row label {
    grid-column: 1 / -1;
    font-weight: 600;
    color: var(--primary);
    font-size: 0.9rem;
}

input {
    padding: 10px;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: var(--primary);
}

button {
    padding: 12px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    transition: opacity 0.3s;
}

button:hover {
    opacity: 0.9;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.result-card {
    margin-top: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea15, #764ba215);
    border-radius: 12px;
    border: 2px solid var(--primary);
}

.result-card h3 {
    margin-bottom: 15px;
    color: var(--primary);
}

.subjects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 15px;
}

.subject {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--border);
}

.subject span:first-child {
    font-weight: 600;
    color: var(--primary);
}

.total {
    text-align: center;
    padding: 15px;
    background: var(--primary);
    color: white;
    border-radius: 8px;
    font-size: 1.1rem;
}

.table-container {
    overflow-x: auto;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

thead {
    background: var(--primary);
    color: white;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

th {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
}

tbody tr:hover {
    background: #f8f9fa;
}

tbody tr:last-child td {
    border-bottom: none;
}

td:last-child {
    color: var(--primary);
    font-weight: 600;
}

@media (max-width: 600px) {
    .form-row {
        grid-template-columns: 1fr;
    }

    .subjects {
        grid-template-columns: 1fr;
    }

    .table-container {
        font-size: 0.85rem;
    }

    th,
    td {
        padding: 8px;
    }
}
```

---

### 4. index.html (HTML Entry Point)
**Location:** `frontend/index.html`

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description"
    content="VIT Semester Result Management System - Add and view student results with CGPA calculation" />
  <title>VIT Semester Results | Student Portal</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
    rel="stylesheet">
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

---

## 🗄️ Database Setup

### setup_database.sql
**Location:** `backend/setup_database.sql`

```sql
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
```

---

### create_table.sql
**Location:** `backend/create_table.sql`

```sql
-- Drop existing table
DROP TABLE IF EXISTS student_results;

-- Create new table with subject-specific column names
CREATE TABLE student_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(255) NOT NULL,
    
    -- ANN (Artificial Neural Networks)
    ann_mse DOUBLE CHECK (ann_mse >= 0 AND ann_mse <= 30),
    ann_ese DOUBLE CHECK (ann_ese >= 0 AND ann_ese <= 70),
    
    -- CNT (Computer Networks and Technologies)
    cnt_mse DOUBLE CHECK (cnt_mse >= 0 AND cnt_mse <= 30),
    cnt_ese DOUBLE CHECK (cnt_ese >= 0 AND cnt_ese <= 70),
    
    -- DAA (Design and Analysis of Algorithms)
    daa_mse DOUBLE CHECK (daa_mse >= 0 AND daa_mse <= 30),
    daa_ese DOUBLE CHECK (daa_ese >= 0 AND daa_ese <= 70),
    
    -- CC (Cloud Computing)
    cc_mse DOUBLE CHECK (cc_mse >= 0 AND cc_mse <= 30),
    cc_ese DOUBLE CHECK (cc_ese >= 0 AND cc_ese <= 70)
) ENGINE=InnoDB;
```

---

## ⚙️ Configuration Files

### application.properties
**Location:** `backend/src/main/resources/application.properties`

```properties
server.port=8080

spring.application.name=vit-result

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

---

### pom.xml
**Location:** `backend/pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>vit-result</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>vit-result</name>
  <description>VIT semester result API (Spring Boot + MySQL)</description>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.4</version>
    <relativePath/>
  </parent>

  <properties>
    <java.version>17</java.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-j</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <scope>runtime</scope>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

---

### package.json
**Location:** `frontend/package.json`

```json
{
  "name": "vit-result-frontend",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.8",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

---

## 🚀 How to Run

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 18+ and npm

### Backend Setup

1. **Setup MySQL Database:**
```bash
mysql -u root -p < backend/setup_database.sql
```

2. **Update Database Password:**
Edit `backend/src/main/resources/application.properties` and set your MySQL password.

3. **Run Backend:**
```bash
cd backend
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install
```

2. **Run Frontend:**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### API Endpoints

- **POST** `/api/results/add` - Add a new student result
- **GET** `/api/results/all` - Get all student results

### Features

✅ Add student results with MSE and ESE marks for 4 subjects  
✅ Automatic calculation of subject totals (MSE + ESE = 100 per subject)  
✅ View all results in a table format  
✅ Responsive design with modern UI  
✅ Real-time validation  
✅ MySQL database persistence  

---

## 📊 Grading System

- **MSE (Mid-Semester Exam):** 0-30 marks (30%)
- **ESE (End-Semester Exam):** 0-70 marks (70%)
- **Subject Total:** MSE + ESE = 100 marks
- **Overall Total:** 4 subjects × 100 = 400 marks

---

## 🎯 Subjects

1. **ANN** - Artificial Neural Networks
2. **CNT** - Computer Networks
3. **DAA** - Design & Analysis of Algorithms
4. **CC** - Cloud Computing

---

**Created with ❤️ for VIT Students**
