import { pool } from "../db";
export const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  export const getUser = async (userid: number) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userid];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; 
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  