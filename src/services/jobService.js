import pool from "../db/index.js";

//create a new job
export const createJob= async(
    userId,
  company,
  role,
  status,
  applied_date,
  notes
)=>{
    const result= await pool.query(
    `
    INSERT INTO job_applications
    (user_id, company, role, status, applied_date, notes)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [userId, company, role, status, applied_date, notes]
    );
    return result.rows[0];

    // get user jobs
    export const getUserJobs = async (userId) => {
    const result = await pool.query(
      `SELECT * FROM job_applications
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;

    }
}