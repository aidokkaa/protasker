import { pool } from "../db";
export interface TaskData {
  title: string;
  description?: string;
  due_date?: Date;
  status: string;
  user_id: number;
  customer_name: string; 
  customer_address: string; 
  customer_phone: string; 
}
export const insertTask = async (data: TaskData) => {
  const {
    title,
    description,
    due_date,
    status,
    user_id,
    customer_name,
    customer_address,
    customer_phone,
  } = data;

  const query = `
    INSERT INTO public.tasks 
    (title, description, due_date, status, user_id, customer_name, customer_address, customer_phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    title,
    description,
    due_date,
    status,
    user_id,
    customer_name,
    customer_address,
    customer_phone,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error + " insert error");
    throw error;
  }
};

export const getTaskById = async (id: number) => {
  const query = 'SELECT * FROM tasks WHERE id = $1';
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw new Error('Task not found');
    }
    return result.rows[0]; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export async function getTasksByUserId(user_id:number) {
  try {
    const result = await pool.query(
      `SELECT tasks.* FROM tasks
       JOIN task_assignments ON tasks.id = task_assignments.task_id
       WHERE task_assignments.user_id = $1`,
      [user_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export const getTasks = async () => {
  const query = 'SELECT * FROM tasks';
  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      console.log('No tasks found');
      return []; 
    }
    return result.rows; 
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err; 
  }
};
export const getAllAssignedTasks = async () => {
  const query = `
    SELECT 
      tasks.id AS task_id, 
      tasks.title, 
      tasks.description, 
      tasks.status, 
      tasks.due_date, 
      tasks.created_at AS task_created_at, 
      tasks.updated_at AS task_updated_at, 
      tasks.customer_phone, 
      tasks.customer_name, 
      tasks.customer_address,
      users.id AS user_id,
      users.first_name,
      users.last_name,
      users.email,
      users.gender,
      users.role,
      users.created_at AS user_created_at
    FROM 
      task_assignments AS ta
    JOIN 
      tasks ON ta.task_id = tasks.id
    JOIN 
      users ON ta.user_id = users.id  -- Исправлено на users.id
    ORDER BY 
      ta.task_id, ta.user_id;
  `;
  try {
    const result = await pool.query(query); 
    if (result.rows.length === 0) {
      console.log('No tasks found');
      return []; 
    }
    return result.rows; 
  } catch (error) {
    console.error('Error fetching assigned tasks:', error);
    throw error; 
  }
};

export const updateTaskStatus = async (id: number, status: string) => {
  const validStatuses = ["new", "in progress", "completed"];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const result = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  if (result.rowCount === 0) {
    throw new Error("Task not found");
  }

  return result.rows[0]; 
};
export const updateTask = async (id: number, data: Partial<TaskData>) => {
  const { title, description, due_date, status, user_id } = data;

  const query = `
    UPDATE public.tasks 
    SET 
      name = COALESCE($1, name), 
      description = COALESCE($2, description), 
      due_date = COALESCE($3, due_date), 
      status = COALESCE($5, status), 
      user_id = COALESCE($6, user_id)
    WHERE id = $7
    RETURNING *;
  `;

  const values = [title, description,due_date, status, user_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Task not found'); 
    }
    return result.rows[0]; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
export const getAssignTaskById = async (userId:number)=>{
  const query = `
  SELECT tasks.*
  FROM tasks
  JOIN task_assignments ON tasks.id = task_assignments.task_id
  WHERE task_assignments.user_id = $1;
`;
const result = await pool.query(query, [userId]);
return result.rows;
}
export const deleteTaskById = async (taskId: number) => {
  const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1", [taskId]);
  
  if (taskCheck.rows.length === 0) {
    throw new Error("Task not found");
  }

  await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
  return { message: "Task deleted successfully" };
};






