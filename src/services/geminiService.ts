import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { saveLead } from "./leadService";

const getApiKey = () => {
  try {
    return process.env.GEMINI_API_KEY || "";
  } catch {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const captureLeadSchema: FunctionDeclaration = {
  name: "capture_lead",
  description: "Captures lead information from a user interested in web design services.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Full name of the user" },
      phone: { type: Type.STRING, description: "Phone number of the user" },
      businessName: { type: Type.STRING, description: "Name of their business" },
      websiteType: { type: Type.STRING, description: "The type of website they need (e.g., E-commerce, Portfolio, Business site)" }
    },
    required: ["name", "phone", "businessName", "websiteType"]
  }
};

export const systemInstruction = `You are the AI Assistant for Jay's Web Design Services. 
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
Once you have the details, call the 'capture_lead' function.`;

export async function chatWithAI(messages: { role: "user" | "model"; content: string }[]) {
  const contents = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction,
      tools: [{ functionDeclarations: [captureLeadSchema] }]
    }
  });

  return response;
}
