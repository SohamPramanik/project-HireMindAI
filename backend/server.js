import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("HireMind Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
