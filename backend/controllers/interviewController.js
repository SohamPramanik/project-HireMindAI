import Interview from "../models/Interview.js";

import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "../services/geminiService.js";

// ==========================================
// CREATE INTERVIEW
// ==========================================

export const createInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        message: "Role and difficulty are required",
      });
    }

    const generated = await generateInterviewQuestions(role, difficulty);

    if (
      !generated ||
      !generated.questions ||
      generated.questions.length === 0
    ) {
      return res.status(500).json({
        message: "Gemini failed to generate interview questions",
      });
    }

    const interview = await Interview.create({
      user: req.user._id,
      role,
      difficulty,
      questions: generated.questions,
      currentQuestion: 0,
      totalScore: 0,
      status: "in-progress",
    });

    res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create interview error:", error);

    res.status(500).json({
      message: "Failed to create interview",
    });
  }
};

// ==========================================
// GET INTERVIEW
// ==========================================

export const getInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json({
      interview,
    });
  } catch (error) {
    console.error("Get interview error:", error);

    res.status(500).json({
      message: "Failed to fetch interview",
    });
  }
};

// ==========================================
// SUBMIT ANSWER
// ==========================================

export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex, answer } = req.body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (
      questionIndex === undefined ||
      questionIndex === null ||
      !answer ||
      !answer.trim()
    ) {
      return res.status(400).json({
        message: "Question index and answer are required",
      });
    }

    const interview = await Interview.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // -----------------------------
    // Check interview status
    // -----------------------------

    if (interview.status === "completed") {
      return res.status(400).json({
        message: "Interview is already completed",
      });
    }

    // -----------------------------
    // Get question
    // -----------------------------

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(400).json({
        message: "Invalid question",
      });
    }

    // -----------------------------
    // Prevent duplicate submission
    // -----------------------------

    if (question.answer && question.score !== null) {
      return res.status(400).json({
        message: "This question has already been answered",
      });
    }

    // -----------------------------
    // Gemini evaluation
    // -----------------------------

    const evaluation = await evaluateAnswer(
      interview.role,
      interview.difficulty,
      question.question,
      answer.trim(),
    );

    // -----------------------------
    // Save evaluation
    // -----------------------------

    question.answer = answer.trim();
    question.score = Number(evaluation.score);
    question.feedback = evaluation.feedback || "";

    question.strengths = Array.isArray(evaluation.strengths)
      ? evaluation.strengths
      : [];

    question.weaknesses = Array.isArray(evaluation.weaknesses)
      ? evaluation.weaknesses
      : [];

    question.improvements = Array.isArray(evaluation.improvements)
      ? evaluation.improvements
      : [];

    // -----------------------------
    // Calculate average score
    // -----------------------------

    const answeredQuestions = interview.questions.filter(
      (q) => q.score !== null,
    );

    const total = answeredQuestions.reduce((sum, q) => sum + q.score, 0);

    interview.totalScore =
      answeredQuestions.length > 0
        ? Number((total / answeredQuestions.length).toFixed(2))
        : 0;

    // -----------------------------
    // Update current question
    // -----------------------------

    interview.currentQuestion = questionIndex + 1;

    // -----------------------------
    // Complete interview
    // -----------------------------

    if (questionIndex === interview.questions.length - 1) {
      interview.status = "completed";
    }

    await interview.save();

    res.status(200).json({
      message: "Answer evaluated successfully",

      evaluation,

      interview: {
        id: interview._id,
        currentQuestion: interview.currentQuestion,
        totalScore: interview.totalScore,
        status: interview.status,
      },
    });
  } catch (error) {
    console.error("Answer evaluation error:", error);

    res.status(500).json({
      message: "Failed to evaluate answer",
    });
  }
};
