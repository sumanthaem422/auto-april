import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini on server-side with metadata header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Server-side API endpoint for Gemini chat proxy
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { history, text, systemPrompt } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required and is not set on the server." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...(history || []),
        { role: 'user', parts: [{ text }] }
      ],
      config: {
        systemInstruction: systemPrompt
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Server Error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

// Vite middleware or static serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start fullstack server:", err);
});
