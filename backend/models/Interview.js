import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: null,
      min: 0,
      max: 10,
    },

    feedback: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },
  },
  { _id: true },
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    currentQuestion: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Interview", interviewSchema);
