import { createJob, getJobs } from "../services/jobService.js";

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