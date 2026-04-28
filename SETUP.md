# RashiNow Setup Guide

## Prerequisites
- Node.js installed
- MySQL database (phpMyAdmin)
- Database named: `rashifal`

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database Connection

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://username:password@localhost:3306/rashifal"
JWT_SECRET="your-secret-key-change-this-in-production"
```

Replace:
- `username` with your MySQL username
- `password` with your MySQL password
- `localhost:3306` with your MySQL host and port if different
- `rashifal` with your database name

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create the `User` and `Rashi` tables in your database.

### 5. Create Admin User

You can create an admin user by making a POST request to `/api/auth/create-user`:

```bash
curl -X POST http://localhost:3000/api/auth/create-user \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

Or use Postman/Thunder Client to make the request.

### 6. Start Development Server

```bash
npm run dev
```

### 7. Access the Application

- Home Page: http://localhost:3000
- Login Page: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard (after login)

## Database Schema

### User Table
- id (Int, Primary Key, Auto Increment)
- username (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)
- updatedAt (DateTime)

### Rashi Table
- id (Int, Primary Key, Auto Increment)
- name (String)
- nameNepali (String, Optional)
- description (Text)
- shortDescription (Text, Optional)
- favoriteColor (String)
- favoriteNumber (Int)
- icon (String) - Image filename
- weeklyDescription (Text, Optional)
- monthlyDescription (Text, Optional)
- createdAt (DateTime)
- updatedAt (DateTime)

## Features

### Home Page
- Displays all 12 Rashis
- Clean, modern design inspired by Pronto
- Login button in header
- Responsive design

### Login Page
- Username and password authentication
- JWT token-based session
- Redirects to dashboard on success

### Dashboard
- View all Rashis
- Add new Rashi
- Edit existing Rashi
- Delete Rashi
- Full CRUD operations

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/create-user` - Create new user (setup only)

### Rashi Management (Requires Authentication)
- `GET /api/rashis` - Get all rashis
- `POST /api/rashis` - Create new rashi
- `GET /api/rashis/[id]` - Get single rashi
- `PUT /api/rashis/[id]` - Update rashi
- `DELETE /api/rashis/[id]` - Delete rashi

## Notes

- All API routes require JWT authentication (except login and create-user)
- Token is stored in localStorage after login
- Token expires after 7 days
- Make sure to change JWT_SECRET in production
- Remove or protect the create-user endpoint after initial setup
