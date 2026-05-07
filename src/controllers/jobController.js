import { createJob, getUserJobs , updateJob,deleteJob} from "../services/jobService.js";

// CREATE JOB
export const addJob = async (req, res) => {
  try {
    const {
      company,
      role,
      status,
      applied_date,
      notes,
    } = req.body;

    // convert status to lowercase
    const formattedStatus = status.toLowerCase();

    // create job
    const job = await createJob(
      req.user.id,
      company,
      role,
      formattedStatus,
      applied_date,
      notes
    );

    res.status(201).json(job);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET USER JOBS
export const fetchJobs = async (req, res) => {
  try {

    const jobs = await getJobs(req.user.id);

    res.status(200).json(jobs);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
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