import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { saveLead } from "./leadService";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

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
Once you have the details, call the 'capture_lead' function.

After you call 'capture_lead' and receive a successful response, acknowledge it warmly and let the user know Jay will be in touch. 
Then, continue to be available for any other questions they might have about Jay's services. Do not ask for their information again.`;

export type Message = 
  | { role: "user"; content: string }
  | { role: "model"; content: string; functionCalls?: any[] }
  | { role: "function"; name: string; content: any };

export async function chatWithAI(messages: Message[]) {
  const contents = messages.map(m => {
    if (m.role === "function") {
      return {
        role: "function",
        parts: [{ 
          functionResponse: { 
            name: m.name, 
            response: typeof m.content === 'object' ? m.content : { result: m.content } 
          } 
        }]
      };
    }
    
    const parts: any[] = [];
    
    if (m.content) {
      parts.push({ text: m.content });
    }
    
    if (m.role === "model" && m.functionCalls) {
      m.functionCalls.forEach(fc => {
        parts.push({ functionCall: fc });
      });
    }

    return {
      role: m.role || "user",
      parts
    };
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [captureLeadSchema] }]
      }
    });

    const text = response.text || "";
    const functionCalls = response.functionCalls || [];
    
    return { text, functionCalls };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // On the domain, we want to know if it's an API key issue
    if (error.message?.includes("API key")) {
      throw new Error("Chatbot is currently disconnected. Please try again in a few minutes or call Jay!");
    }
    throw error;
  }
}
