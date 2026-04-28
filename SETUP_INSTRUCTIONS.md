# RashiNow Setup Instructions

## Step 1: Create .env File

Create a `.env` file in the root directory with the following content:

```env
DATABASE_URL="mysql://root:TestPP10$@localhost:3306/rashifal"
JWT_SECRET="rashiNow-secret-key-2024-change-in-production"
```

## Step 2: Generate Prisma Client

Run this command to generate the Prisma client:

```bash
npm run prisma:generate
```

## Step 3: Create Database Tables (Migration)

Run this command to create the tables in your database:

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., "init") and press Enter.

## Step 4: Create Admin User

Run this command to create the default admin user:

```bash
npm run setup:db
```

This will create an admin user with the following credentials:

**Login Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

## Step 5: Start the Development Server

```bash
npm run dev
```

## Step 6: Access the Application

- **Home Page:** http://localhost:3000
- **Login Page:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard (after login)

## Quick Setup Commands (Run All at Once)

```bash
# 1. Generate Prisma Client
npm run prisma:generate

# 2. Create Tables
npm run prisma:migrate

# 3. Create Admin User
npm run setup:db

# 4. Start Server
npm run dev
```

## Troubleshooting

### If migration fails:
1. Make sure your MySQL server is running
2. Verify the database `rashifal` exists in phpMyAdmin
3. Check your database credentials in `.env`

### If admin user creation fails:
- The user might already exist. You can still use:
  - Username: `admin`
  - Password: `admin123`

### To reset database:
```bash
# Reset and recreate tables
npx prisma migrate reset
npm run setup:db
```

## Database Schema

The following tables will be created:

### User Table
- id (Primary Key)
- username (Unique)
- password (Hashed)
- createdAt
- updatedAt

### Rashi Table
- id (Primary Key)
- name
- nameNepali (Optional)
- description
- shortDescription (Optional)
- favoriteColor
- favoriteNumber
- icon (Image filename)
- weeklyDescription (Optional)
- monthlyDescription (Optional)
- createdAt
- updatedAt

## Features

✅ Home page with Pronto-inspired design
✅ Login system with JWT authentication
✅ Dashboard with full CRUD operations
✅ Add/Edit/Delete Rashis
✅ All 12 Rashis displayed on home page
✅ Responsive design

## Login Credentials Summary

**Username:** admin
**Password:** admin123

**⚠️ Important:** Change the password after first login for security!
