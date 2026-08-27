import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Career & Side-Hustle Plan Generator
  app.post("/api/gemini/generate-plan", async (req, res) => {
    try {
      const { mathLevel, weeklyHours, targetMonthlyIncome, strongSubjects, technicalSkills, preferredMode } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured yet. You can still use our interactive calculators and curated pathways!",
        });
      }

      const prompt = `You are a high-level Career & Earning Strategist specializing in mathematics undergraduates and graduate students.
A math student has provided the following profile:
- Math Academic Level: ${mathLevel || "Undergraduate Math Major"}
- Weekly Available Hours: ${weeklyHours || 10} hours/week
- Target Monthly Income: $${targetMonthlyIncome || 1000}/month
- Strong Subjects: ${strongSubjects || "Calculus, Linear Algebra, Statistics, Discrete Math"}
- Technical/Software Skills: ${technicalSkills || "Python, LaTeX, Excel"}
- Preferred Working Mode: ${preferredMode || "Remote & Flexible"}

Please create a structured, realistic, high-earning monetization blueprint tailored specifically to their math background.
Include:
1. Executive Summary & Recommended Strategy Blend (e.g. 60% AI Math Annotation + 40% High-Stakes Tutoring).
2. Top 3 Immediate Income Streams with specific hourly rate targets and expected timeline to first dollar.
3. 7-Day Sprint Checklist (exact actions to take this week to get hired or land first client).
4. Unfair Math Advantages (how to position abstract reasoning, proofs, and quantitative rigor over general freelancers).
5. Exact platforms to apply to right now with application insider tips (Outlier.ai, DataAnnotation, Wyzant, Remotasks, Upwork LaTeX, etc.).

Provide clean, highly motivating, actionable markdown formatting with clear headings and bullet points.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert mathematical career monetization advisor who provides realistic, actionable, and mathematically sound earning advice for students.",
        },
      });

      res.json({ plan: response.text });
    } catch (err: unknown) {
      console.error("Error in generate-plan:", err);
      const message = err instanceof Error ? err.message : "Failed to generate strategy";
      res.status(500).json({ error: message });
    }
  });

  // AI Pitch & Proposal Generator
  app.post("/api/gemini/generate-pitch", async (req, res) => {
    try {
      const { pitchType, targetAudience, subjectArea, background, desiredRate } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
        });
      }

      const prompt = `Write a high-converting, professional pitch or proposal tailored for a math student.
Details:
- Pitch Type: ${pitchType} (e.g. Tutoring Parent Outreach, University Peer Tutoring, Upwork Freelance Proposal for Math/Data/LaTeX, Outlier/DataAnnotation Math Specialist Application Statement, Local Flyer Text)
- Target Audience: ${targetAudience}
- Specific Math Topic/Subject: ${subjectArea}
- Student's Background/Credentials: ${background}
- Target Rate / Value Proposition: ${desiredRate ? `$${desiredRate}/hr` : "Competitive market rate"}

Requirements:
- Make it confident, clear, credible, and value-driven.
- Emphasize clarity in explaining complex mathematical concepts, proof rigor, or quick turnaround.
- Provide 2 variations:
  Option 1: Direct & Punchy (Concise, high-impact)
  Option 2: Comprehensive & Credential-focused (Detailed, highlighting pedagogy or analytical methodology)
- Include a subject line or opening hook for each variation.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ pitch: response.text });
    } catch (err: unknown) {
      console.error("Error in generate-pitch:", err);
      const message = err instanceof Error ? err.message : "Failed to generate pitch";
      res.status(500).json({ error: message });
    }
  });

  // AI Math Earning Coach (Interactive Q&A)
  app.post("/api/gemini/chat-advisor", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
        });
      }

      const contextHistory = Array.isArray(conversationHistory)
        ? conversationHistory.map((msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          }))
        : [];

      const chat = ai.chats.create({
        model: "gemini-3.7-flash",
        config: {
          systemInstruction:
            "You are 'EulerBot', an expert AI earning advisor exclusively dedicated to helping mathematics students monetize their skills. You advise on AI prompt evaluation/RLHF platforms (Outlier, DataAnnotation, Alignerr), SAT/Calculus/Linear Algebra tutoring client acquisition, quantitative freelancing (Python/R/Excel/Deductive modeling), academic LaTeX typesetting, and creating digital math tools. Keep your answers direct, practical, numbers-backed, and encouraging.",
        },
        history: contextHistory,
      });

      const response = await chat.sendMessage({
        message: message || "How can I start earning money as a math student?",
      });

      res.json({ reply: response.text });
    } catch (err: unknown) {
      console.error("Error in chat-advisor:", err);
      const message = err instanceof Error ? err.message : "Failed to communicate with advisor";
      res.status(500).json({ error: message });
    }
  });

  // RLHF Math Annotation Evaluator
  app.post("/api/gemini/evaluate-annotation", async (req, res) => {
    try {
      const { problemStatement, modelAnswer, userCritique, userCorrection } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
        });
      }

      const prompt = `In AI data training platforms (like Outlier, Scale AI, DataAnnotation), math reviewers are tested on catching subtle mathematical errors, formatting lapses, faulty reasoning steps, and hallucinated calculations.

Given:
Problem: ${problemStatement}
Model Generated Response: ${modelAnswer}

Reviewer's Critique: ${userCritique}
Reviewer's Corrected Solution: ${userCorrection}

Evaluate the reviewer's performance as if you were a Senior RLHF Math Quality Lead:
1. Score out of 10 for Accuracy & Rigor
2. Did they catch all logical/mathematical mistakes?
3. Clarity and pedagogical quality of their feedback
4. Constructive feedback on how they can ace actual Outlier/DataAnnotation onboarding tests.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ evaluation: response.text });
    } catch (err: unknown) {
      console.error("Error in evaluate-annotation:", err);
      const message = err instanceof Error ? err.message : "Failed to evaluate annotation";
      res.status(500).json({ error: message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
