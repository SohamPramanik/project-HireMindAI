import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateSummary = async (questions) => {
  const prompt = `
You are an experienced technical interviewer.

Below are interview questions, candidate answers and scores.

${JSON.stringify(questions)}

Write an overall performance review.

Return ONLY JSON.

{
    "overallFeedback":"..."
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  const cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
