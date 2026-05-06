import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addJob, fetchJobs } from '../controllers/jobController.js';

const router = express.Router();    

//protected routes
router.post("/", authMiddleware, addJob);
router.get("/", authMiddleware, fetchJobs);

export default router;