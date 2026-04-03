import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, Globe, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", website: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">Ready to Scale?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Stop settling for average. Let's build a digital presence that actually moves the needle for your business.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto bg-gray-900/50 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row">
          {/* Left Sidebar - Info */}
          <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Contact Details</h3>
              <p className="text-blue-100 mb-10">
                Prefer a direct conversation? Reach out via any of these channels.
              </p>
              
              <div className="space-y-8">
                <a href="mailto:jaywebdesignsa@gmail.com" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Email Us</p>
                    <p className="font-bold text-lg">jaywebdesignsa@gmail.com</p>
                  </div>
                </a>
                <a href="tel:8302905856" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Call Us</p>
                    <p className="font-bold text-lg">(830) 290-5856</p>
                  </div>
                </a>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Response Time</p>
                    <p className="font-bold text-lg">Under 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Globe size={18} className="text-blue-200" />
                <span className="font-bold">San Antonio, Texas</span>
              </div>
              <p className="text-blue-100 text-sm">Serving clients across all 50 states.</p>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3 p-10 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="(830) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Current Website <span className="text-gray-600 text-[10px] ml-1">(Optional)</span></label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Tell us about your goals</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What are you looking to achieve with your new website?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-xl shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Launch Project
                    <Send size={22} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-green-400 bg-green-400/10 p-5 rounded-2xl border border-green-400/20"
                  >
                    <CheckCircle size={24} />
                    <span className="font-medium">Success! We'll be in touch within 24 hours.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-red-400 bg-red-400/10 p-5 rounded-2xl border border-red-400/20"
                  >
                    <AlertCircle size={24} />
                    <span className="font-medium">Error sending message. Please call us directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
