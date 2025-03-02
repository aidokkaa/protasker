import express, { Request, Response } from 'express';
import { createCommentController, getCommentsController, deleteCommentController } from '../controllers/comments'; // Импортируем контроллеры
import { verifyToken, verifyManagerRole, verifyAdminRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/comments/:taskId', verifyToken, getCommentsController);

router.post('/comments/:taskId', verifyToken, createCommentController);

router.delete('/comments/:commentId', verifyToken, verifyManagerRole, verifyAdminRole, deleteCommentController);

export default router;
