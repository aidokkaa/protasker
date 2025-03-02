import { Request, Response } from 'express';
import { createComment, getCommentsByTaskId, deleteComment } from '../models/commentModels' 
export const createCommentController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user?.id;
    console.log("taskId:", taskId);
    console.log("userId:", userId);
    console.log("content:", content);
    const newComment = await createComment(Number(taskId), Number(userId), content);
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

export const getCommentsController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const comments = await getCommentsByTaskId(Number(taskId));
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await deleteComment(Number(commentId));

    if (deletedComment) {
      res.status(200).json({ message: 'Comment deleted', comment: deletedComment });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};









