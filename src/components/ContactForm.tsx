import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, Globe, MessageSquare } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('mqegywzr');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  // Handle local state for input values while using Formspree's handleSubmit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Free Site Review</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight leading-tight">Ready for a Strategy Chat?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Stop settling for average. Speak directly with the designer and let's build a digital presence that actually moves the needle for your business.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto bg-gray-900/50 backdrop-blur-xl rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row">
          {/* Left Sidebar - Info */}
          <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Contact Details</h3>
              <p className="text-blue-100 mb-8 md:mb-10 text-sm md:text-base">
                Prefer a direct conversation? Reach out via any of these channels.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                <a href="mailto:jaywebdesignsa@gmail.com" className="flex items-center gap-4 md:gap-5 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">Email Me</p>
                    <p className="font-bold text-base md:text-lg break-all">jaywebdesignsa@gmail.com</p>
                  </div>
                </a>
                <a href="tel:2109001113" className="flex items-center gap-4 md:gap-5 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">Call Me</p>
                    <p className="font-bold text-base md:text-lg">(210) 900-1113</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">Response Time</p>
                    <p className="font-bold text-base md:text-lg">Under 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Globe size={18} className="text-blue-200" />
                <span className="font-bold text-sm md:text-base">Serving Nationwide</span>
              </div>
              <p className="text-blue-100 text-xs md:text-sm">Available across all 50 states & all time zones.</p>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3 p-8 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm md:text-base"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm md:text-base"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    required
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(210) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm md:text-base"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Current Website <span className="text-gray-600 text-[10px] ml-1">(Optional)</span></label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-600 text-sm md:text-base"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                  <ValidationError prefix="Website" field="website" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">What’s the #1 thing you want your new website to achieve?</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="e.g. I want to double my monthly leads, rank #1 for my core services nationwide, or automate my booking process."
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600 text-sm md:text-base"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1 ml-1" />
              </div>

              <button
                disabled={state.submitting}
                type="submit"
                className="w-full btn-primary btn-glow py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 text-lg md:text-xl"
              >
                {state.submitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Submit Form
                    <Send size={22} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {state.succeeded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-green-400 bg-green-400/10 p-5 rounded-2xl border border-green-400/20"
                  >
                    <CheckCircle size={24} />
                    <span className="font-medium">Success! I'll be in touch within 24 hours.</span>
                  </motion.div>
                )}

                {state.errors && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-5 rounded-2xl border border-red-400/20">
                      <AlertCircle size={24} />
                      <span className="font-medium">There was an issue with your submission. Please check the fields above.</span>
                    </div>
                    <a 
                      href={`mailto:jaywebdesignsa@gmail.com?subject=Project Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AWebsite: ${formData.website}%0D%0AMessage: ${formData.message}`}
                      className="w-full bg-white text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 hover:bg-gray-200"
                    >
                      Send via Email App
                      <Mail size={20} />
                    </a>
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
