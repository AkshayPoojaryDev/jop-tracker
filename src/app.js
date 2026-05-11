import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

import jobRoutes from "./routes/jobRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});