import {pool} from '../db';
export const createComment=async (taskId:number,userId:number,text:string)=>{
    const query= 'INSERT INTO comments (task_id, user_id, content) VALUES ($1, $2, $3) RETURNING *;';
    const values = [taskId, userId, text];
    try{
      const result = await pool.query(query,values);
      return result.rows[0]
    }
    catch(err){
        console.error('Error creating comment:', err);
        throw err;
    }
};
export const getCommentsByTaskId = async (taskId: number) => {
    const query = 'SELECT * FROM comments WHERE task_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [taskId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };
  export const deleteComment = async (commentId: number) => {
    const query = 'DELETE FROM comments WHERE id = $1 RETURNING *';
    try {
      const result = await pool.query(query, [commentId]);
      return result.rows[0]; 
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };