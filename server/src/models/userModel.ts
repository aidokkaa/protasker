import { pool } from "../db";
export const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    hashedPass: string,
    gender: string,
    role:string='user'
  ): Promise<any> => {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, gender,role) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
      [firstName, lastName, email, hashedPass, gender,role]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  };
  export const findUserByEmail = async (email: string): Promise<any | null> => {
    const result = await pool.query('SELECT * FROM public.users WHERE email=$1', [email]);
    console.log('eee',result.rows[0])
    return result.rows[0] || null;
};

