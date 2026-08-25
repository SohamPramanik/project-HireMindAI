import express from "express";

import {
  createInterview,
  submitAnswer,
} from "../controllers/interviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createInterview);

router.post("/:id/answer", authMiddleware, submitAnswer);

export default router;
