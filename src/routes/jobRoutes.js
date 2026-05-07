import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addJob, fetchJobs,editJob,removeJob } from '../controllers/jobController.js';

const router = express.Router();    

//protected routes
router.post("/", authMiddleware, addJob);
router.get("/", authMiddleware, fetchJobs);
router.put("/:id", authMiddleware, editJob);
router.delete("/:id", authMiddleware, removeJob);

export default router;