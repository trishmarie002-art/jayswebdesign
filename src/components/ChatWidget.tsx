import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Loader2, User, Bot, Phone, Globe } from "lucide-react";
import { Message, chatWithAI } from "../services/geminiService";
import { saveLead } from "../services/leadService";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! I'm here to help with your web design project. What do you need help with today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Pop up automatically within 10 seconds of browsing
    const timer = setTimeout(() => {
      if (!hasAutomaticallyOpened && !isOpen) {
        setIsOpen(true);
        setHasAutomaticallyOpened(true);
      }
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, [hasAutomaticallyOpened, isOpen]);

  const MAX_CHARS = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      let currentHistory = [...newMessages];
      let response = await chatWithAI(currentHistory);
      
      // Handle function calls loop (e.g. if AI wants to confirm more things)
      let iterations = 0;
      while (response.functionCalls && response.functionCalls.length > 0 && iterations < 3) {
        iterations++;
        
        // Add the model's intent (the function call) to history
        currentHistory.push({ 
          role: "model", 
          content: response.text, 
          functionCalls: response.functionCalls,
          thought: response.thought
        });
        
        const functionResponses: Message[] = [];
        
        for (const call of response.functionCalls) {
          if (call.name === "capture_lead") {
            try {
              const args = call.args as any;
              await saveLead({
                name: args.name,
                phone: args.phone,
                businessName: args.businessName,
                websiteType: args.websiteType,
                source: "chatbot"
              });
              functionResponses.push({ 
                role: "function", 
                name: "capture_lead", 
                content: { success: true, message: "Lead information successfully saved to the database. Jay will be notified." } 
              });
            } catch (err) {
              console.error("Error saving lead:", err);
              functionResponses.push({ 
                role: "function", 
                name: "capture_lead", 
                content: { success: false, error: "Database error occurred" } 
              });
            }
          }
        }
        
        // Add function responses to history and call AI again to get the final text response
        currentHistory = [...currentHistory, ...functionResponses];
        response = await chatWithAI(currentHistory);
      }

      if (response.text) {
        setMessages([...currentHistory, { role: "model", content: response.text, thought: response.thought }]);
      } else {
        setMessages(currentHistory);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "model", content: "Oops! I hit a snag. You can always call Jay directly at (830) 290-5856 for immediate help!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[80vh] bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-white p-4 text-gray-800 flex items-center justify-between shadow-sm relative z-10 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <MessageCircle size={22} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-gray-900">Jay's Web Design Helper</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-[10px] text-gray-500 font-medium tracking-wide">Available now</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform p-1 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.filter(msg => (msg.role === "user" || msg.role === "model") && msg.content).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 border ${
                      msg.role === "user" 
                        ? "bg-gray-800 border-gray-700 text-white" 
                        : "bg-white border-gray-200 text-gray-500"
                    }`}>
                      {msg.role === "user" ? <User size={14} /> : <MessageCircle size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gray-800 text-white rounded-tr-none shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mt-1 text-gray-500">
                      <MessageCircle size={14} />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
              <a href="tel:8302905856" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-[10px] font-bold text-gray-700 transition-colors uppercase tracking-wider">
                <Phone size={10} className="text-gray-500" /> Call Jay
              </a>
              <button 
                onClick={() => setInput("How much for a new website?")}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-[10px] font-bold text-gray-700 transition-colors uppercase tracking-wider"
              >
                <Globe size={10} className="text-gray-500" /> Pricing
              </button>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      autoFocus
                      value={input}
                      maxLength={MAX_CHARS}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:border-gray-300 transition-all placeholder:text-gray-400"
                    />
                    {input && (
                      <button
                        type="button"
                        onClick={() => setInput("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-11 h-11 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-gray-900 rounded-xl flex items-center justify-center text-white transition-all shadow-sm active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="flex justify-end pr-1 transition-all">
                  <span className={`text-[10px] font-medium tracking-tight ${
                    input.length >= MAX_CHARS * 0.9 ? "text-red-500 animate-pulse" : "text-gray-400"
                  }`}>
                    {input.length} / {MAX_CHARS}
                  </span>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={!isOpen ? {
          y: [0, -10, 0],
        } : {}}
        transition={!isOpen ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle size={32} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <>
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </span>
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
               Need help? Chat with AI ⚡️
               <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-l-white border-y-transparent border-r-transparent"></div>
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
}

