import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, CheckCircle2, Mail } from "lucide-react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you'd send this to your email service
    }
  };

  if (!isVisible) return null;

  return (
    <section className="py-12 bg-blue-600 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Free Resource
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 font-display tracking-tight leading-tight">
              Is Your Website Costing You Customers?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Download my <span className="text-blue-600 font-bold">Free 10-Point Website Conversion Checklist</span> and discover the exact tweaks that turn casual browsers into high-paying leads. No fluff, just results.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      required
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-black focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-xl shadow-blue-600/20"
                  >
                    Get My Free Checklist
                    <Download size={20} />
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    I hate spam too. Your email is safe with me.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-600/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Check Your Inbox!</h3>
                  <p className="text-gray-600">
                    Your checklist is on its way. Get ready to boost your conversions!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
