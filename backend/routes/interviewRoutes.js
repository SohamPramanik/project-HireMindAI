import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  generateInterview,
  getInterview,
  submitAnswer,
  finishInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateInterview);

router.get("/:id", authMiddleware, getInterview);

router.post("/:id/answer", authMiddleware, submitAnswer);

router.post("/:id/finish", authMiddleware, finishInterview);

export default router;
