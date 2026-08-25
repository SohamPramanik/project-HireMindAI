import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const evaluateAnswer = async (question, answer) => {
  const prompt = `
You are an experienced technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON.

{
  "score": 8,
  "feedback": "...",
  "idealAnswer": "..."
}
`;

  const response = await ai.models.generateContent({
    model: "models/gemini-flash-latest",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
