import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: Number,

  question: String,

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

    level: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    questions: [questionSchema],

    totalScore: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    overallFeedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Interview", interviewSchema);
