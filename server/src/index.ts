import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentsRouter from './routes/documents';
import chatRouter from './routes/chat';
import path from 'path';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3001');

// Enable CORS for development
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.FRONTEND_URL,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/documents', documentsRouter);
app.use('/api/chat', chatRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Handle port in use error
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: any) {
    if (error?.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}`);
      app.listen(port + 1);
    } else {
      console.error('Error starting server:', error);
    }
  }
};

startServer(); 