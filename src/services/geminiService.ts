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
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        messages: messages.map(m => ({
          role: m.role === "model" ? "assistant" : m.role,
          content: m.role === "function" 
            ? JSON.stringify(m.content) 
            : (m as any).content,
        }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get AI response");
    }

    // Read the streamed response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let text = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
      }
    }

    return { text, functionCalls: [], thought: undefined };
  } catch (error: any) {
    console.error("Chat API Error:", error);
    if (error.message?.includes("API key") || error.message?.includes("Failed")) {
      throw new Error("I'm having trouble connecting to my brain! Please try again in a moment or call Jay directly.");
    }
    throw error;
  }
}
