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
}
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


    // update a job
export const updateJob = async(
    jobId,
    company,
    role,
    status,
    applied_date,
    notes
)=>{
  const result = await pool.query(
    `UPDATE job_applications 
    SET company = $1, role = $2, status = $3, applied_date = $4, notes = $5 
    WHERE id = $6 RETURNING *`,
    [company, role, status, applied_date, notes, jobId]
  );
  return result.rows[0];
  
}


//delete a job
export const deleteJob = async(jobId, userId)=>{
 const result=await pool.query(
    `
    DELETE FROM job_applications
     WHERE id = $1 and user_id = $2 RETURNING *`,
    [jobId, userId]
  );
  return result.rows[0]
}