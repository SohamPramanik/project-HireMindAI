import Interview from "../models/Interview.js";

export const getDashboard = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const totalInterviews = interviews.length;

    const completed = interviews.filter(
      (i) => i.status === "Completed",
    ).length;

    const pending = interviews.filter(
      (i) => i.status === "Pending",
    ).length;

    const totalScore = interviews.reduce(
      (sum, i) => sum + (i.totalScore || 0),
      0,
    );

    const averageScore =
      completed > 0 ? (totalScore / completed).toFixed(1) : 0;

    const recentInterviews = interviews.slice(0, 5);

    res.json({
      totalInterviews,
      completed,
      pending,
      averageScore,
      recentInterviews,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};