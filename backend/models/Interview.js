import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    default: "",
  },

  score: {
    type: Number,
    default: 0,
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

  idealAnswer: {
    type: String,
    default: "",
  },
});

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
    },

    difficulty: {
      type: String,
      required: true,
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

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;