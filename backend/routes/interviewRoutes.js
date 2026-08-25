import express from "express";

import {
  createInterview,
  getInterview,
  submitAnswer,
} from "../controllers/interviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new interview
router.post("/", authMiddleware, createInterview);

// Get interview by ID
router.get("/:id", authMiddleware, getInterview);

// Submit answer
router.post("/:id/answer", authMiddleware, submitAnswer);

export default router;
