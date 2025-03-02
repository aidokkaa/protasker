import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';

  interface DecodedToken {
    userId: string;
    role: string;
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: DecodedToken; // добавляем поле user типа DecodedToken
      }
    }
  }
  

  export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.authtoken; // Получаем токен из cookies
    console.log('JWT Token:', token);
  
    if (!token) {
      res.status(403).json({ error: 'No token provided!' });
      return;
    }
  
    try {
      // Убедимся, что токен декодируется корректно
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  
      // Добавляем информацию о пользователе в объект запроса
      (req as any).user = { id: decoded.userId, role: decoded.role };
  
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };

  export const verifyManagerRole = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.authtoken; 
    console.log('Manager verify token:', token);
  
    if (!token) {
      res.status(403).json({ error: 'No token provided!' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

      if (decoded.role !== 'manager') {
        res.status(403).json({ error: 'Access denied. Only managers are allowed.' });
        return;
      }
  
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  export const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
  
    if (!token) {
     res.status(403).json({ error: 'No token provided!' }); 
     return;
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid or expired token' }); 
        }
        const decodedToken = decoded as DecodedToken; 
        if (decodedToken.role !== 'admin') {
          return res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
        }
        next();
      });
  };
