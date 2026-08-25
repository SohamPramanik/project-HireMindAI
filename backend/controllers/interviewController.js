import Interview from "../models/Interview.js";
import { generateQuestions } from "../services/geminiService.js";
import { evaluateAnswer } from "../services/evaluateAnswer.js";
import { generateSummary } from "../services/interviewSummary.js";

export const generateInterview = async (req, res) => {
  try {
    const { role, level } = req.body;

    const data = await generateQuestions(role, level);

    const interview = await Interview.create({
      user: req.user._id,
      role,
      level,
      questions: data.questions,
    });

    res.status(201).json({
      success: true,
      interviewId: interview._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // Find the question
    const question = interview.questions.find((q) => q.id === questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // Evaluate using Gemini
    const result = await evaluateAnswer(question.question, answer);

    // Save the result
    question.answer = answer;
    question.score = result.score;
    question.feedback = result.feedback;
    question.idealAnswer = result.idealAnswer;

    await interview.save();

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const finishInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    let total = 0;

    interview.questions.forEach((q) => {
      total += q.score || 0;
    });

    const average = total / interview.questions.length;

    const summary = await generateSummary(interview.questions);

    interview.status = "Completed";
    interview.totalScore = total;
    interview.averageScore = average;
    interview.overallFeedback = summary.overallFeedback;

    await interview.save();

    res.json({
      success: true,
      totalScore: total,
      averageScore: average,
      overallFeedback: summary.overallFeedback,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
