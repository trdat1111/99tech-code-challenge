# ExpressJS CRUD API with TypeScript & MySQL

## 🚀 Project Overview

This is a simple backend server built with **ExpressJS** and **TypeScript** that provides a **CRUD API** to manage resources. It connects to a **MySQL database** for data persistence and ensures the table is created if it does not exist.

## 📂 Project Structure

```
.
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── db.ts
│   ├── controller
│   │   └── resource.controller.ts
│   ├── model
│   │   └── resource.model.ts
│   ├── routes
│   │   └── resource.routes.ts
├── build/ (compiled files)
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## 🔧 Setup & Installation

### **1️⃣ Clone the Repository**

```sh
git clone <repository-url>
cd <repository-folder>
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure Environment Variables**

Create a **.env** file in the project root and add:

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=resource_99tech
DB_USER=root
DB_PASSWORD=password1
```

### **4️⃣ Start the MySQL Server**

Ensure MySQL is running. If needed, create the database manually:

```sh
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS resource_99tech;"
```

### **5️⃣ Compile & Run the Server**

#### 🔹 Option 1: Run with TypeScript

```sh
npx tsx src/server.ts
```

#### 🔹 Option 2: Compile and Run

```sh
npx tsc
node build/server.js
```

---

## 🔥 API Endpoints

### 📌 **1. Create a Resource**

```sh
curl -X POST http://localhost:3000/resources \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Resource", "type":"example"}'
```

_Response:_

```json
{ "message": "Resource created successfully" }
```

### 📌 **2. List Resources**

```sh
curl -X GET http://localhost:3000/resources
```

_Response:_

```json
[{ "id": 1, "name": "Test Resource", "type": "example" }]
```

### 📌 **3. Get a Resource by ID**

```sh
curl -X GET http://localhost:3000/resources/1
```

_Response:_

```json
{ "id": 1, "name": "Test Resource", "type": "example" }
```

### 📌 **4. Update a Resource**

```sh
curl -X PUT http://localhost:3000/resources/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Resource"}'
```

_Response:_

```json
{ "message": "Resource updated successfully" }
```

### 📌 **5. Delete a Resource**

```sh
curl -X DELETE http://localhost:3000/resources/1
```

_Response:_

```json
{ "message": "Resource deleted successfully" }
```

---

## Libraries Used

-   ExpressJS - Web framework for Node.js
-   TypeScript - Strongly typed JavaScript
-   Drizzle ORM - Lightweight ORM for MySQL
-   MySQL2 - MySQL client for Node.js
-   Dotenv - Load environment variables

---

## 📌 Notes

-   If you run into any errors, check if **MySQL is running** and verify your **.env** configuration.
-   Install mysql using Docker is more convenient
