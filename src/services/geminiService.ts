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
  | { role: "model"; content: string; functionCalls?: any[]; thought?: string }
  | { role: "function"; name: string; content: any };

export interface AIResponse {
  text: string;
  functionCalls?: any[];
  thought?: string;
}

export async function chatWithAI(messages: Message[]): Promise<AIResponse> {
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
    
    if (m.role === "model") {
      if (m.thought !== undefined) {
        parts.push({ thought: m.thought });
      } else if (m.functionCalls && m.functionCalls.length > 0) {
        parts.push({ thought: "" });
      }
    }

    if (m.content) {
      parts.push({ text: m.content });
    }
    
    if (m.role === "model" && m.functionCalls) {
      m.functionCalls.forEach((fc: any) => {
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
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [captureLeadSchema] }]
      }
    });

    const text = response.text || "";
    const parts = response.candidates?.[0]?.content?.parts || [];
    
    const functionCalls = parts
      ?.filter(part => part.functionCall)
      ?.map(part => part.functionCall) || [];
      
    const thoughtPart = parts?.find(part => 'thought' in part && typeof (part as any).thought === 'string');
    const thought = (thoughtPart as any)?.thought as string | undefined;

    return { text, functionCalls, thought };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API key")) {
      throw new Error("I'm having trouble connecting to my brain! Please try again in a moment or call Jay directly.");
    }
    throw error;
  }
}
