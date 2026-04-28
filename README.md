# RashiNow - Vedic Astrology Admin System

A beautiful Next.js application for managing and displaying 12 Rashis (Zodiac Signs) with Vedic Astrology predictions.

## Features

- 🎨 Beautiful, modern UI with animations
- ☁️ Animated cloud background effects
- 🎠 Sliding banner carousel
- 📱 Fully responsive design
- 🔮 Rashi detail pages with full information
- 🎯 MongoDB integration for data management
- ✨ Smooth animations using Framer Motion

## Getting Started

### Prerequisites

- Node.js 20+ installed
- MongoDB cluster connection string

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions (MongoDB connection)
- `/models` - Mongoose models
- `/types` - TypeScript type definitions
- `/public` - Static assets

## API Endpoints

- `GET /api/rashis` - Get all rashis
- `POST /api/rashis` - Create a new rashi
- `GET /api/rashis/[id]` - Get a single rashi
- `PUT /api/rashis/[id]` - Update a rashi
- `DELETE /api/rashis/[id]` - Delete a rashi

## Rashi Model

Each Rashi includes:
- Name (English and Nepali)
- Description
- Favorite Color
- Favorite Number
- Icon (emoji or icon name)
- 7 Days Description (optional)
- 1 Month Description (optional)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
