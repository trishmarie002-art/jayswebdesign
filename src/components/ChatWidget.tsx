import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, MessageSquare, X } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "8302905856";

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-64 bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
              <div>
                <h4 className="font-bold">How can we help?</h4>
                <p className="text-xs text-blue-100">Contact Jay's Web Design directly</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white group"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Call Us</p>
                  <p className="text-xs text-gray-400">(830) 290-5856</p>
                </div>
              </a>
              <a
                href={`sms:${phoneNumber}?body=I'm%20ready%20for%20my%20free%20strategy%20chat`}
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white group"
              >
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Text Us</p>
                  <p className="text-xs text-gray-400">Send an SMS</p>
                </div>
              </a>
            </div>
            <div className="bg-gray-900/50 p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Available 24/7</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 relative"
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
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
