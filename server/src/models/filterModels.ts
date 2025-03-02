import { pool } from "../db";

export const getProjectsByStatus=async (status:string)=>{
 const query = 'SELECT * FROM projects WHERE status=$1';
 try{
    const result = await pool.query(query,[status]);
    return result.rows;
 }
 catch(err){
    console.error('Error while getting projects by status:', err);
    throw err;
 }
}

export const getprojectsByUser=async (user_id:number)=>{
   const query = 'SELECT * FROM projects WHERE user_id=$1';
   try{
      const result = await pool.query(query,[user_id]);
      return result.rows;
   }catch(err){
      console.error('Error while getting projects by user:', err);
      throw err
   }
}
export const getProjectsByDate = async (start_date:string)=>{
     const query = "SELECT * FROM projects WHERE start_date>=$1"
     try{
       const result = await pool.query(query,[start_date]);
       console.log("start date",result.rows)
       return result.rows;
     }catch(error){
            console.log('error',error);
            throw error;
     }
}