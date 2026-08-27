import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================================
// HELPER: CLEAN GEMINI JSON RESPONSE
// =========================================

const parseGeminiJSON = (text) => {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini JSON Parse Error:", error);
    console.error("Gemini Raw Response:", text);

    throw new Error("Gemini returned invalid JSON.");
  }
};

// =========================================
// GENERATE INTERVIEW QUESTIONS
// =========================================

export const generateInterviewQuestions = async (role, difficulty) => {
  const topicInstructions = {
    Backend: `
Focus specifically on backend development.

Possible areas:
- REST APIs
- HTTP/HTTPS
- Authentication and authorization
- JWT
- Middleware
- Server architecture
- MVC
- Databases
- API security
- Error handling
- Caching
- Scalability
- Backend performance
- Sessions
- Rate limiting
`,

    Frontend: `
Focus specifically on frontend development.

Possible areas:
- HTML
- CSS
- JavaScript
- DOM
- Events
- React
- Components
- Props
- State
- Hooks
- API integration
- Browser concepts
- Responsive design
- Performance
- Accessibility
`,

    Java: `
Focus specifically on Java programming.

Possible areas:
- OOP
- Classes and objects
- Inheritance
- Polymorphism
- Encapsulation
- Abstraction
- Interfaces
- Collections
- Exception handling
- Multithreading
- JVM
- JDK
- JRE
- Memory management
- Java 8+ features
`,

    "C++": `
Focus specifically on C++ programming.

Possible areas:
- C++ syntax
- OOP
- Pointers
- References
- Memory management
- Constructors/destructors
- Inheritance
- Polymorphism
- STL
- Vectors
- Maps
- Sets
- Templates
- Smart pointers
- Exception handling
- Modern C++
`,

    Python: `
Focus specifically on Python programming.

Possible areas:
- Python syntax
- Data types
- Lists
- Tuples
- Sets
- Dictionaries
- Functions
- OOP
- Decorators
- Generators
- Exception handling
- Iterators
- Modules
- Virtual environments
- Memory management
`,

    "AI/ML": `
Focus specifically on Artificial Intelligence and Machine Learning.

Possible areas:
- Machine learning fundamentals
- Supervised learning
- Unsupervised learning
- Classification
- Regression
- Clustering
- Feature engineering
- Model evaluation
- Overfitting
- Underfitting
- Bias and variance
- Neural networks
- Deep learning
- NLP
- Transformers
- Generative AI
`,

    SQL: `
Focus specifically on SQL and relational databases.

Possible areas:
- SELECT
- WHERE
- GROUP BY
- HAVING
- ORDER BY
- JOINs
- Subqueries
- CTEs
- Window functions
- Aggregation
- Indexes
- Transactions
- ACID
- Normalization
- Constraints
- Query optimization
`,

    MongoDB: `
Focus specifically on MongoDB and NoSQL databases.

Possible areas:
- Documents
- Collections
- BSON
- CRUD
- MongoDB queries
- Aggregation pipeline
- Indexes
- Schema design
- Embedding
- Referencing
- MongoDB transactions
- Replication
- Sharding
- Performance
- Mongoose
`,

    Blockchain: `
Focus specifically on blockchain technology.

Possible areas:
- Blockchain fundamentals
- Blocks
- Hashing
- Cryptography
- Distributed ledgers
- Consensus mechanisms
- Proof of Work
- Proof of Stake
- Smart contracts
- Ethereum
- Bitcoin
- Wallets
- Transactions
- Digital signatures
- Decentralization
- Security
`,
  };

  const selectedTopic =
    topicInstructions[role] ||
    `
Focus specifically on ${role}.

Only ask questions directly related to ${role}.
`;

  const prompt = `
You are an expert technical interviewer.

The candidate selected:

TOPIC: ${role}
DIFFICULTY: ${difficulty}

${selectedTopic}

Generate exactly 10 technical interview questions.

DIFFICULTY RULES:

Beginner:
- Fundamental concepts
- Basic terminology
- Simple practical questions
- Basic examples

Intermediate:
- Deeper technical understanding
- Practical implementation
- Debugging
- Design decisions
- Real-world scenarios

Advanced:
- Complex technical concepts
- System/design decisions
- Performance
- Scalability
- Security
- Edge cases
- Real-world engineering scenarios

IMPORTANT RULES:

1. Every question MUST be related to ${role}.
2. Do NOT ask questions from unrelated technologies.
3. Do NOT mix different interview topics.
4. Questions should gradually become more challenging.
5. Avoid duplicate or nearly identical questions.
6. Cover different concepts within ${role}.
7. Questions must test actual technical understanding.
8. Do not provide answers.
9. Do not provide explanations.
10. Do not include numbering inside the question text.

Return ONLY valid JSON.

EXACT STRUCTURE:

{
  "questions": [
    {
      "question": "Question here"
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const result = parseGeminiJSON(response.text);

  if (
    !result.questions ||
    !Array.isArray(result.questions) ||
    result.questions.length !== 10
  ) {
    throw new Error("Gemini did not return exactly 10 questions.");
  }

  return result;
};

// =========================================
// EVALUATE ANSWER
// =========================================

export const evaluateAnswer = async (role, difficulty, question, answer) => {
  const prompt = `
You are an expert technical interviewer.

The candidate is being interviewed specifically on:

TOPIC:
${role}

DIFFICULTY:
${difficulty}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate the candidate's answer ONLY in the context of ${role}.

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
- Evaluate whether the answer actually addresses the question.
- Evaluate whether the answer is technically correct for ${role}.
- Score from 0 to 10.
- 0 = completely incorrect/no useful answer.
- 10 = excellent, accurate and complete answer.
- Give constructive feedback.
- Explain what was wrong.
- Explain what the candidate did well.
- Provide an ideal answer.
- Do not evaluate concepts unrelated to ${role}.

Return ONLY valid JSON.

EXACT STRUCTURE:

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
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const evaluation = parseGeminiJSON(response.text);

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
