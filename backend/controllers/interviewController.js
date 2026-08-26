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

    // Generate questions using Gemini
    const generated = await generateInterviewQuestions(role, difficulty);

    if (
      !generated ||
      !Array.isArray(generated.questions) ||
      generated.questions.length === 0
    ) {
      return res.status(500).json({
        message: "Gemini failed to generate interview questions",
      });
    }

    // Save interview
    const interview = await Interview.create({
      user: req.user.id,
      role,
      difficulty,
      questions: generated.questions,
      currentQuestion: 0,
      totalScore: 0,
      status: "in-progress",
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
// GET INTERVIEW
// =========================================

export const getInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      interview,
    });
  } catch (error) {
    console.error("GET INTERVIEW ERROR:", error);

    return res.status(500).json({
      message: "Failed to load interview",
      error: error.message,
    });
  }
};

// =========================================
// GET DASHBOARD DATA
// =========================================

export const getDashboard = async (req, res) => {
  try {
    // Get only interviews belonging to logged-in user
    const interviews = await Interview.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    // Total number of interviews
    const totalInterviews = interviews.length;

    // Completed interviews
    const completedInterviews = interviews.filter(
      (interview) => interview.status === "completed",
    );

    // Pending / in-progress interviews
    const pendingInterviews = interviews.filter(
      (interview) => interview.status !== "completed",
    );

    // Calculate average score
    let averageScore = 0;

    if (completedInterviews.length > 0) {
      const totalScore = completedInterviews.reduce(
        (sum, interview) => sum + Number(interview.totalScore || 0),
        0,
      );

      averageScore = totalScore / completedInterviews.length;
    }

    // Get latest 5 interviews
    const recentInterviews = interviews.slice(0, 5).map((interview) => ({
      _id: interview._id,
      role: interview.role,
      difficulty: interview.difficulty,
      score: Number(interview.totalScore || 0),
      status: interview.status,
      date: interview.createdAt,
    }));

    return res.status(200).json({
      totalInterviews,
      averageScore: Number(averageScore.toFixed(1)),
      completed: completedInterviews.length,
      pending: pendingInterviews.length,
      recentInterviews,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard data",
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

    // Validate request
    if (
      questionIndex === undefined ||
      questionIndex === null ||
      typeof answer !== "string" ||
      !answer.trim()
    ) {
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

    // Validate question index
    if (questionIndex < 0 || questionIndex >= interview.questions.length) {
      return res.status(400).json({
        message: "Invalid question index",
      });
    }

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(400).json({
        message: "Question not found",
      });
    }

    console.log(`Evaluating Q${questionIndex + 1} for interview ${id}`);

    // =========================================
    // GEMINI EVALUATION
    // =========================================

    const evaluation = await evaluateAnswer(
      interview.role,
      interview.difficulty,
      question.question,
      answer.trim(),
    );

    // =========================================
    // SAVE ANSWER + EVALUATION
    // =========================================

    question.answer = answer.trim();

    question.score = Number(evaluation.score) || 0;

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

    question.idealAnswer = evaluation.idealAnswer || "";

    // =========================================
    // UPDATE CURRENT QUESTION
    // =========================================

    interview.currentQuestion = questionIndex + 1;

    // =========================================
    // CALCULATE AVERAGE SCORE
    // =========================================

    const answeredQuestions = interview.questions.filter(
      (q) => typeof q.score === "number",
    );

    if (answeredQuestions.length > 0) {
      const total = answeredQuestions.reduce((sum, q) => sum + q.score, 0);

      interview.totalScore = total / answeredQuestions.length;
    } else {
      interview.totalScore = 0;
    }

    // =========================================
    // COMPLETE INTERVIEW
    // =========================================

    if (interview.currentQuestion >= interview.questions.length) {
      interview.status = "completed";
    }

    await interview.save();

    console.log(
      `Q${questionIndex + 1} evaluated. Score: ${evaluation.score}/10`,
    );

    return res.status(200).json({
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
