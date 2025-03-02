import { insertTask,TaskData,getTaskById,getTasks,updateTask,getAssignTaskById,updateTaskStatus,deleteTaskById} from "../models/tasks";
import { getAllAssignedTasks } from "../models/tasks";
import { Request, Response, NextFunction } from "express";
import { getTasksByUserId } from "../models/tasks";
import { pool } from '../db';
export const createTask = async (req: Request, res: Response) => {
  const {
    title,
    description,
    start_date,
    end_date,
    status,
    user_id,
    customer_name,
    customer_address,
    customer_phone,
  } = req.body;
  try {
    const newTask = await insertTask(req.body);
    res.status(200).json({
      message: "Task created successfully!",
      task: newTask,
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при создании задачи." });
  }
};

export const getTask = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id); 
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' }); 
      }
  
      const result = await getTaskById(id);
      if (!result) {
        return res.status(404).json({ error: 'Task not found' }); 
      }
  
      res.status(200).json(result); 
    } catch (err) {
      console.error(err); 
      res.status(500).json(err); 
    }
  };
export const fetchTasks = async (req: Request, res: Response) => {
  try {
    const projects = await getTasks();
    res.status(200).json(projects); 
  } catch (err) {
    console.error('Error in fetchProjects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export async function getUserTasks(req: Request, res: Response) {
  let { user_id } = req.query;
  
  if (!user_id || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const parsedUserId = parseInt(user_id, 10);

  if (isNaN(parsedUserId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const tasks = await getTasksByUserId(parsedUserId);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getAssignedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllAssignedTasks(); 
   const result = tasks.map(task => ({
      task: {
        id: task.task_id, 
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date,
        created_at: task.task_created_at,  
        updated_at: task.task_updated_at,  
        customer_phone: task.customer_phone,
        customer_name: task.customer_name,
        customer_address: task.customer_address,
      },
      user: {
        id: task.user_id, 
        first_name: task.first_name,
        last_name: task.last_name,
        email: task.email,
        gender: task.gender,
        role: task.role,
        created_at: task.user_created_at,  
      }
    }));

    res.status(200).json(result); 
  } catch (error) {
    console.error('Error in getAssignedTasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTaskStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const taskId = Number(id);
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const updatedTask = await updateTaskStatus(taskId, status);
    
    res.json(updatedTask);
  } catch (error: any) {
    console.error("Error updating task status:", error.message);

    if (error.message === "Invalid status value") {
      res.status(400).json({ error: error.message });
      return;
    }

    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
export const modifyTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const data = req.body; 
    const updatedTask = await updateTask(id, data);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const assignTaskToUser = async (req: Request, res: Response) => {
  try {
    const { taskId, userId } = req.body; 
    
    if (!taskId || !userId) {
      return res.status(400).json({ error: 'Task ID and User ID are required' });
    }

    const result = await pool.query(
      'INSERT INTO task_assignments (task_id, user_id) VALUES ($1, $2) RETURNING *',
      [taskId, userId]
    );

    return res.status(200).json({ message: 'Task assigned successfully', assignment: result.rows[0] });
  } catch (error) {
    console.error('Error assigning task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getTaskForUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const tasks = await getAssignTaskById(userId); 
  if (tasks.length === 0) {
    return res.status(404).json({ message: 'No tasks found for this user' });
  }
  return res.status(200).json({ tasks });
};
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { taskId } = req.params;

    if (!taskId || isNaN(Number(taskId))) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    const result = await deleteTaskById(Number(taskId));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


