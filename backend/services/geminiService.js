const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateInterviewQuestions(role, difficulty) {
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
- Return ONLY valid JSON.

Return this exact structure:

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

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

async function evaluateAnswer(role, difficulty, question, answer) {
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

Return ONLY valid JSON using this exact structure:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "weaknesses": [],
  "improvements": []
}

Rules:
- score must be between 0 and 10.
- Evaluate correctness and technical understanding.
- Do not give credit for incorrect technical claims.
- Keep feedback constructive.
- strengths, weaknesses and improvements should contain concise strings.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

module.exports = {
  generateInterviewQuestions,
  evaluateAnswer,
};
