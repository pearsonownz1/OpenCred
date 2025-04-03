# OpenCred Server

Backend server for the OpenCred application built with Express.js, TypeScript, and Prisma.

## Tech Stack

- Node.js with Express
- TypeScript
- Prisma ORM
- Supabase
- OpenAI integration
- PDF processing capabilities (pdf-parse, pdf2image)
- OCR functionality (Tesseract.js)
- Authentication (express-jwt, jwks-rsa)

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- PostgreSQL database (for Prisma)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the server root directory with necessary configurations.

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm start` - Run the built project
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed the database with initial data

## Project Structure

- `src/` - Source code directory
- `prisma/` - Database schema and migrations
- `dist/` - Compiled JavaScript output
