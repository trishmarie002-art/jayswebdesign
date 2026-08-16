import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is included with affordable web design in TX?",
    answer: "Every project is tailored to the business, but a typical website includes responsive mobile design, clear service information, contact buttons or forms, search-friendly page structure, basic on-page SEO, and launch support. I recommend only the pages and features that make sense for your goals and budget.",
  },
  {
    question: "Do you build websites for businesses throughout Texas?",
    answer: "Yes. Jay's Web Design Services works with small businesses across Texas, including San Antonio, Austin, Houston, Dallas-Fort Worth, surrounding communities, and rural service areas. Meetings and project communication can be handled remotely by phone, text, and email.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "I specialize in high-speed, high-performance delivery. A professional, revenue-generating website is typically completed in just 72 hours. I build fast so you can start generating leads and sales immediately.",
  },
  {
    question: "Do you offer SEO services?",
    answer: "Yes. Every website is built with search-friendly titles, headings, mobile performance, crawlable links, and organized content. I also offer ongoing SEO support. Rankings depend on competition, content, reputation, links, and other factors, so no specific position can be guaranteed.",
  },
  {
    question: "Can you fix my existing website?",
    answer: "Absolutely. I specialize in website repair and maintenance. Whether it's a slow loading speed, broken links, or a full redesign, I've got you covered.",
  },
  {
    question: "What are your prices?",
    answer: "My pricing is project-based and depends on your specific needs. I offer competitive rates for small businesses and flexible packages for larger enterprises. Contact me for a custom quote!",
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "I can help you set up and manage your hosting and domain, or I can work with your existing provider. I recommend high-performance hosting to ensure your site stays fast and secure.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">Affordable Web Design in TX FAQs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need to know about working with Jay's Web Design.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="text-blue-600 flex-shrink-0" size={24} />
                  <span className="text-lg font-bold text-black">{faq.question}</span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <Minus className="text-blue-600" size={20} />
                  ) : (
                    <Plus className="text-blue-600" size={20} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 italic">Still have questions? I'm here to help.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-colors"
          >
            Contact me directly
          </a>
        </div>
      </div>
    </section>
  );
}
