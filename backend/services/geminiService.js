import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

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
- Questions should be practical and interview-oriented.
- Return ONLY valid JSON.

Return exactly this structure:

{
  "questions": [
    {
      "question": "Question here"
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = cleanJSON(text);

  return JSON.parse(cleaned);
};

// =========================================
// EVALUATE ANSWER
// =========================================

export const evaluateAnswer = async (role, difficulty, question, answer) => {
  const prompt = `
You are an expert technical interviewer.

Candidate role:
${role}

Interview difficulty:
${difficulty}

Interview question:
${question}

Candidate answer:
${answer}

Evaluate the candidate's answer.

Return ONLY valid JSON using exactly this structure:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "weaknesses": [],
  "improvements": []
}

Rules:
- score must be a number between 0 and 10.
- Evaluate technical correctness.
- Evaluate understanding of the concept.
- Evaluate completeness.
- Do not give credit for technically incorrect claims.
- Keep feedback constructive.
- strengths must contain concise strings.
- weaknesses must contain concise strings.
- improvements must contain concise strings.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = cleanJSON(text);

  return JSON.parse(cleaned);
};
