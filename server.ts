import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  
  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { contents, config } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: config
      });

      // return raw parts to help with function calls and thoughts
      const parts = response.candidates?.[0]?.content?.parts || [];
      res.json({ text: response.text, parts });
    } catch (error: any) {
      console.error("Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/google3d9d936012e1e974.html", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "google3d9d936012e1e974.html"));
  });

  app.get("/manifest.json", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "manifest.json"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      maxAge: '1y',
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
