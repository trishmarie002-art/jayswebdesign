import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Globe, MessageCircle, Phone, Send, User, X } from "lucide-react";
import { saveLead } from "../services/leadService";

type ChatMessage = { role: "user" | "helper"; content: string };
type LeadStep = "idle" | "name" | "business" | "website" | "phone" | "complete";
type LeadDraft = { name: string; businessName: string; websiteType: string; phone: string };

const starterOptions = [
  "I need a website",
  "Website pricing",
  "SEO services",
  "Website repair",
  "Logo or flyer design",
  "Speak with Jay",
];

const replies = {
  pricing:
    "Every project is quoted based on what your business needs. I can collect a few details now so Jay can give you a personalized price.",
  seo:
    "Jay offers local and nationwide SEO to help businesses appear higher in search results. He can review your goals and recommend the right plan.",
  repair:
    "Jay can help repair broken pages, mobile problems, forms, slow websites, and other website issues. Let's collect your information so he can take a look.",
  design:
    "Jay creates professional logos, advertising flyers, business cards, and other branded graphics. Let's get a few details for your project.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "helper", content: "Hi! How can I help your business today? Choose an option below or type a question." },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<LeadStep>("idle");
  const [lead, setLead] = useState<LeadDraft>({ name: "", businessName: "", websiteType: "", phone: "" });
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasAutomaticallyOpened && !isOpen) {
        setIsOpen(true);
        setHasAutomaticallyOpened(true);
      }
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [hasAutomaticallyOpened, isOpen]);

  const addMessages = (...next: ChatMessage[]) => setMessages((current) => [...current, ...next]);

  const startLead = (websiteType = "Website project") => {
    setLead({ name: "", businessName: "", websiteType, phone: "" });
    setStep("name");
    addMessages({ role: "helper", content: "Great! What is your name?" });
  };

  const handleChoice = (choice: string) => {
    addMessages({ role: "user", content: choice });
    const normalized = choice.toLowerCase();

    if (normalized.includes("speak") || normalized.includes("call") || normalized.includes("phone")) {
      addMessages({ role: "helper", content: "You can call or text Jay now at (830) 290-5856. Tap the Call Jay button below, or I can collect your details for a callback." });
      return;
    }
    if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("how much")) {
      addMessages({ role: "helper", content: replies.pricing });
      startLead("Website pricing request");
      return;
    }
    if (normalized.includes("seo") || normalized.includes("google") || normalized.includes("rank")) {
      addMessages({ role: "helper", content: replies.seo });
      startLead("SEO services");
      return;
    }
    if (normalized.includes("repair") || normalized.includes("fix") || normalized.includes("broken")) {
      addMessages({ role: "helper", content: replies.repair });
      startLead("Website repair");
      return;
    }
    if (normalized.includes("logo") || normalized.includes("flyer") || normalized.includes("graphic")) {
      addMessages({ role: "helper", content: replies.design });
      startLead("Logo or flyer design");
      return;
    }
    if (normalized.includes("website") || normalized.includes("store") || normalized.includes("ecommerce")) {
      startLead("New website");
      return;
    }

    addMessages({ role: "helper", content: "I can help with websites, pricing, SEO, website repairs, logos, and flyers. Choose an option below, or call Jay at (830) 290-5856." });
  };

  const handleLeadAnswer = async (answer: string) => {
    if (step === "name") {
      setLead((current) => ({ ...current, name: answer }));
      setStep("business");
      addMessages({ role: "helper", content: `Nice to meet you, ${answer}! What is your business name?` });
      return;
    }
    if (step === "business") {
      setLead((current) => ({ ...current, businessName: answer }));
      setStep("website");
      addMessages({ role: "helper", content: "What type of website or service do you need?" });
      return;
    }
    if (step === "website") {
      setLead((current) => ({ ...current, websiteType: answer }));
      setStep("phone");
      addMessages({ role: "helper", content: "Last question—what phone number should Jay use to contact you?" });
      return;
    }
    if (step === "phone") {
      const completedLead = { ...lead, phone: answer };
      setLead(completedLead);
      setIsSaving(true);
      try {
        await saveLead({ ...completedLead, source: "chatbot" });
        setStep("complete");
        addMessages({ role: "helper", content: "Thank you! Your information was sent successfully. Jay will contact you as soon as possible." });
      } catch (error) {
        console.error("Chat lead save error:", error);
        setStep("complete");
        addMessages({ role: "helper", content: "I couldn't save that automatically. Please call or text Jay at (830) 290-5856 so he can help you directly." });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const answer = input.trim();
    if (!answer || isSaving) return;
    setInput("");
    if (step !== "idle" && step !== "complete") {
      addMessages({ role: "user", content: answer });
      await handleLeadAnswer(answer);
    } else {
      handleChoice(answer);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[80vh] bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-white p-4 text-gray-800 flex items-center justify-between shadow-sm border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <MessageCircle size={22} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Jay's Web Design Helper</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-[10px] text-gray-500 font-medium">Available now</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[88%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 border ${message.role === "user" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                      {message.role === "user" ? <User size={14} /> : <MessageCircle size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${message.role === "user" ? "bg-gray-800 text-white rounded-tr-none" : "bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm"}`}>
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {(step === "idle" || step === "complete") && (
                <div className="flex flex-wrap gap-2 pl-10">
                  {starterOptions.map((option) => (
                    <button key={option} onClick={() => handleChoice(option)} className="px-3 py-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl text-xs font-semibold text-gray-700 transition-colors text-left">
                      {option}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto">
              <a href="tel:8302905856" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                <Phone size={10} /> Call Jay
              </a>
              <button onClick={() => handleChoice("Website pricing")} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                <Globe size={10} /> Pricing
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  maxLength={500}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={step === "phone" ? "Enter your phone number..." : "Type a message..."}
                  className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-400"
                />
                <button type="submit" disabled={isSaving || !input.trim()} aria-label="Send message" className="w-11 h-11 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 rounded-xl flex items-center justify-center text-white">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={!isOpen ? { y: [0, -10, 0] } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 relative group"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        {!isOpen && (
          <>
            <span className="absolute top-0 right-0 flex h-4 w-4"><span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75" /><span className="relative rounded-full h-4 w-4 bg-blue-500" /></span>
            <div className="absolute -left-36 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
              Need help? Chat with us!
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
}
