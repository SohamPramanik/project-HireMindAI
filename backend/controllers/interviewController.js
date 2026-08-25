import Interview from "../models/Interview.js";

import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "../services/geminiService.js";

// =========================================
// CREATE INTERVIEW
// =========================================

export const createInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        message: "Role and difficulty are required",
      });
    }

    console.log("Creating interview:", {
      user: req.user.id,
      role,
      difficulty,
    });

    const generated = await generateInterviewQuestions(role, difficulty);

    const interview = await Interview.create({
      user: req.user.id,
      role,
      difficulty,
      questions: generated.questions,
    });

    console.log("Interview created:", interview._id);

    return res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create interview error:", error);

    return res.status(500).json({
      message: "Failed to create interview",
      error: error.message,
    });
  }
};

// =========================================
// SUBMIT ANSWER
// =========================================

export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex, answer } = req.body;

    if (questionIndex === undefined || !answer?.trim()) {
      return res.status(400).json({
        message: "Question index and answer are required",
      });
    }

    const interview = await Interview.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        message: "Interview is already completed",
      });
    }

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(400).json({
        message: "Invalid question",
      });
    }

    const evaluation = await evaluateAnswer(
      interview.role,
      interview.difficulty,
      question.question,
      answer,
    );

    question.answer = answer;
    question.score = evaluation.score;
    question.feedback = evaluation.feedback;
    question.strengths = evaluation.strengths;
    question.weaknesses = evaluation.weaknesses;
    question.improvements = evaluation.improvements;

    interview.currentQuestion = questionIndex + 1;

    // Calculate current total score
    const answeredQuestions = interview.questions.filter(
      (q) => q.score !== null,
    );

    interview.totalScore =
      answeredQuestions.reduce((sum, q) => sum + q.score, 0) /
      answeredQuestions.length;

    // If all 10 questions are answered
    if (interview.currentQuestion >= interview.questions.length) {
      interview.status = "completed";
    }

    await interview.save();

    return res.json({
      message: "Answer evaluated successfully",
      evaluation,
      interview,
    });
  } catch (error) {
    console.error("Answer evaluation error:", error);

    return res.status(500).json({
      message: "Failed to evaluate answer",
      error: error.message,
    });
  }
};
