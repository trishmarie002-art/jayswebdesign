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
  // Use relative URL by default, allow override via env var for multi-domain setups
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const response = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || "Failed to communicate with AI server");
  }

  return response.json();
}
