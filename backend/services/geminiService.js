import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateQuestions = async (role, level) => {
  const prompt = `
You are an experienced software engineer and technical interviewer.

Generate EXACTLY 10 interview questions.

Role: ${role}

Difficulty: ${level}

Rules:

- Questions must be technical.
- Questions should gradually increase in difficulty.
- Do NOT include answers.
- Return ONLY valid JSON.
- Do not wrap in markdown.

Return this format exactly:

{
  "questions":[
    {
      "id":1,
      "question":"..."
    },
    {
      "id":2,
      "question":"..."
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "models/gemini-flash-latest",
    contents: prompt,
  });

  console.log(response);

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
