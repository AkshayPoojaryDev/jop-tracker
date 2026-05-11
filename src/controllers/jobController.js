import { createJob, getUserJobs , updateJob,deleteJob} from "../services/jobService.js";
import { jobSchema } from "../validators/jobValidator.js";
// CREATE JOB
export const addJob = async (req, res) => {
  try {
    const validatedData =
      jobSchema.parse(req.body);

    const job = await createJob(
      req.user.id,
      validatedData.company,
      validatedData.role,
      validatedData.status,
      validatedData.applied_date,
      validatedData.notes
    );

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// GET USER JOBS
export const fetchJobs = async (req, res) => {
  try {
    const { status, limit, offset } = req.query;

    const jobs = await getJobs(
      req.user.id,
      status,
      limit,
      offset
    );

    res.json(jobs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const editJob = async (req, res) => {
  try{
    const { company, role, status, applied_date, notes } = req.body;

    const update= await updateJob(
      req.params.id,
      company,
      role,
      status,
      applied_date,
      notes
    );
    if (!update) {
      return res.status(404).json({
         message: "Job not found"
         });
         
    }
    res.update(200).json(update);
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

export const removeJob = async (req, res) => {
  try {
    const deleted= await deleteJob(
      req.params.id,
       req.user.id
      );
      if (!deleted) {
        return res.status(404).json({
           message: "Job not found"
           });

    }
    res.status(200).json({
      message: "Job deleted successfully"
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}