# E-Commerce Application

A full-stack e-commerce application built with Spring Boot (Backend) and React (Frontend).

## Prerequisites

- Java 17 or higher
- Maven
- Node.js and npm
- MySQL Database

## Setup Instructions

### Database Setup

1. Create a MySQL database named `ecommerce_db`.
2. Configure your database credentials in `backend/src/main/resources/application.properties` or set environment variables `DB_USERNAME` and `DB_PASSWORD`.
   
   Default credentials in `application.properties`:
   - Username: `root`
   - Password: `root`

   You can override these by setting environment variables before running the application:
   ```bash
   # Linux/Mac
   export DB_USERNAME=your_user
   export DB_PASSWORD=your_password
   
   # Windows (PowerShell)
   $env:DB_USERNAME="your_user"
   $env:DB_PASSWORD="your_password"
   ```

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:root}
```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Or using the built JAR:
   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

The backend will start on `http://localhost:8081`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`.

## Features

- User Authentication (Login/Register)
- Product Browsing & Searching
- Shopping Cart & Checkout
- Order Management
- Admin Dashboard
- User Profile & Wishlist

## Default Accounts

An admin account and sample products will be created automatically on the first run (if you rebuild the backend).

- **Admin Email:** `admin@ecommerce.com`
- **Admin Password:** `admin123`

## Troubleshooting

- **Database Connection Error:** Ensure MySQL is running and credentials are correct.
- **CORS Errors:** Ensure backend is running on port 8081 and frontend on 5173.
