import express from "express";

import {
  createInterview,
  getInterview,
  submitAnswer,
  getDashboard,
} from "../controllers/interviewController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", protect, getDashboard);

// Create interview
router.post("/", protect, createInterview);

// Get interview
router.get("/:id", protect, getInterview);

// Submit answer
router.post("/:id/answer", protect, submitAnswer);

export default router;
