import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-black rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-blue-600 p-10 md:p-16 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's Build Something Great</h2>
              <p className="text-blue-100 mb-10 text-lg">
                Ready to take your business to the next level? Fill out the form and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Send size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Email Us</p>
                    <p className="font-bold">jaywebdesignsa@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Send size={20} className="rotate-90" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Call Us</p>
                    <p className="font-bold">(830) 290-5856</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-blue-200 text-sm mb-2">Location</p>
              <p className="font-bold">San Antonio, Texas</p>
              <p className="text-blue-100 text-sm">Serving Clients Nationwide</p>
            </div>
          </div>

          <div className="lg:w-3/5 p-10 md:p-16 bg-black">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="(830) 290-5856"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Project Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! We'll be in touch soon.</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                >
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again later.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
