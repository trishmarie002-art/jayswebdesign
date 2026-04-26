import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { streamText, tool } from "ai";
import { z } from "zod";
import admin from "firebase-admin";

dotenv.config();

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : null;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Initialize with application default credentials or skip
      console.log("Firebase Admin: No service account key found, lead saving will fail");
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

const systemInstruction = `You are the AI Assistant for Jay's Web Design Services. 
Your goal is to help potential clients by answering their questions about web design, SEO, and the services provided by Jay.
You are professional, helpful, friendly, and persuasive but not pushy.

Services Jay offers:
- Web Design: Custom, responsive websites (72-hour turnaround available).
- SEO Services: High-ranking strategies for local and nationwide markets.
- Website Maintenance: Support to keep sites secure and updated 24/7.
- Website Repair: Fast fixes for technical glitches.
- Logos & Branding: Visual identities.
- Ad Flyer Design: Professional digital and print flyers.

Key Selling Points:
- 72-hour website build available.
- 150+ businesses served nationwide.
- Revenue-generating assets, not just "pretty pages".

IMPORTANT: Your primary objective is to capture lead information (Name, Phone Number, Business Name, and Website Type). 
When a user seems interested or asks about pricing/starting a project, politely ask for these details so Jay can reach out with a personalized quote.
Once you have the details, call the 'capture_lead' tool.

After you call 'capture_lead' and receive a successful response, acknowledge it warmly and let the user know Jay will be in touch. 
Then, continue to be available for any other questions they might have about Jay's services. Do not ask for their information again.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // AI Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      // Convert messages to the format expected by AI SDK
      const formattedMessages = messages
        .filter((m: any) => m.role === "user" || m.role === "assistant")
        .map((m: any) => ({
          role: m.role === "model" ? "assistant" : m.role,
          content: m.content,
        }));

      const result = streamText({
        model: "google/gemini-3-flash",
        system: systemInstruction,
        messages: formattedMessages,
        tools: {
          capture_lead: tool({
            description: "Captures lead information from a user interested in web design services.",
            parameters: z.object({
              name: z.string().describe("Full name of the user"),
              phone: z.string().describe("Phone number of the user"),
              businessName: z.string().describe("Name of their business"),
              websiteType: z.string().describe("The type of website they need (e.g., E-commerce, Portfolio, Business site)"),
            }),
            execute: async ({ name, phone, businessName, websiteType }) => {
              try {
                // Save to Firebase if admin is initialized
                if (admin.apps.length > 0) {
                  const db = admin.firestore();
                  await db.collection("leads").add({
                    name,
                    phone,
                    businessName,
                    websiteType,
                    source: "chatbot",
                    timestamp: new Date().toISOString(),
                  });
                }
                return { success: true, message: "Lead information successfully saved. Jay will be notified." };
              } catch (error) {
                console.error("Error saving lead:", error);
                return { success: false, error: "Failed to save lead information" };
              }
            },
          }),
        },
        maxSteps: 3,
      });

      // Stream the response
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");
      
      let fullText = "";
      for await (const chunk of result.textStream) {
        fullText += chunk;
        res.write(chunk);
      }
      
      res.end();
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ 
        error: "Failed to process chat request",
        message: error.message 
      });
    }
  });

  // API routes
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
