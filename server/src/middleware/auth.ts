import { Request, Response, NextFunction } from 'express';

// Helper function to decode JWT parts
const decodeJwtPart = (part: string) => {
  try {
    // Add padding if needed
    const padding = '='.repeat((4 - part.length % 4) % 4);
    // Convert URL-safe characters back to regular base64
    const base64 = (part + padding).replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString());
  } catch (error) {
    console.error('Failed to decode JWT part:', error);
    return null;
  }
};

// Middleware wrapper to log token content
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log('Received token:', token);
    
    // Decode token parts
    const [headerPart, payloadPart] = token.split('.');
    const header = decodeJwtPart(headerPart);
    const payload = decodeJwtPart(payloadPart);
    
    console.log('Token header:', header);
    console.log('Token payload:', payload);
  }
  
  // Always continue with the request
  next();
};

export default authMiddleware;