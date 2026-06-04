import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization helper for GoogleGenAI
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is required but is missing. Please set it in the Settings.");
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Server-side API endpoint for Gemini chat proxy
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { history, text, systemPrompt } = req.body;
    
    // Get initialized client dynamically
    const ai = getGeminiClient();

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
    const { createServer: createViteServer } = await import("vite");
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
