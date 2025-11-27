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
