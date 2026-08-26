import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================================
// GENERATE INTERVIEW QUESTIONS
// =========================================

export const generateInterviewQuestions = async (role, difficulty) => {
  const prompt = `
You are an expert technical interviewer.

Create a realistic technical interview for:

Role: ${role}
Difficulty: ${difficulty}

Generate exactly 10 technical interview questions.

Requirements:

- Questions must be relevant to the selected role.
- Match the requested difficulty.
- Cover different important concepts.
- Avoid duplicate questions.
- Do not provide answers.
- Questions should test actual technical understanding.
- Return ONLY valid JSON.

Return exactly:

{
  "questions": [
    {
      "question": "Question here"
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

// =========================================
// EVALUATE ANSWER
// =========================================

export const evaluateAnswer = async (role, difficulty, question, answer) => {
  const prompt = `
You are an expert technical interviewer evaluating a candidate.

Candidate Role:
${role}

Interview Difficulty:
${difficulty}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate's answer carefully.

Evaluate based on:

1. Technical correctness
2. Understanding of the concept
3. Completeness
4. Accuracy
5. Clarity
6. Practical understanding

Be strict but fair.

IMPORTANT:
- Do not give credit for incorrect technical claims.
- Do not assume knowledge that the candidate did not demonstrate.
- Score from 0 to 10.
- 0 = completely incorrect/no useful answer.
- 10 = excellent, accurate and complete answer.
- Give constructive feedback.
- Explain what was wrong.
- Explain what the candidate did well.
- Provide an ideal answer that would be considered a strong interview answer.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "idealAnswer": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const evaluation = JSON.parse(cleaned);

  return {
    score: Math.max(0, Math.min(10, Number(evaluation.score) || 0)),

    feedback: evaluation.feedback || "",

    strengths: Array.isArray(evaluation.strengths) ? evaluation.strengths : [],

    weaknesses: Array.isArray(evaluation.weaknesses)
      ? evaluation.weaknesses
      : [],

    improvements: Array.isArray(evaluation.improvements)
      ? evaluation.improvements
      : [],

    idealAnswer: evaluation.idealAnswer || "",
  };
};
