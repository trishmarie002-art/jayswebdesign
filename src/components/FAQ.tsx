import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

// SEO-optimized FAQ content with high-value keywords
const faqs = [
  {
    question: "How much does professional web design cost?",
    answer: "Professional web design costs vary based on project complexity. Basic business websites start around $1,500-$3,000, while custom WordPress sites with e-commerce typically range from $3,000-$10,000. We provide free consultations and detailed quotes tailored to your specific needs and budget.",
  },
  {
    question: "How long does it take to build a custom website?",
    answer: "Most business websites take 2-4 weeks from concept to launch. Complex e-commerce sites or custom web applications may take 4-8 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the entire development process.",
  },
  {
    question: "Do you offer SEO services with web design?",
    answer: "Yes! All our websites are built with SEO best practices including proper heading structure, meta tags, schema markup, fast loading speeds, mobile responsiveness, and Core Web Vitals optimization. We also offer ongoing SEO management services for businesses wanting to improve their search engine rankings.",
  },
  {
    question: "Do you work with clients nationwide?",
    answer: "Absolutely! While we're based in San Antonio, Texas, we serve clients across the entire United States. Our remote process using video calls, project management tools, and clear communication allows us to deliver excellent results regardless of your location.",
  },
  {
    question: "Will I be able to update my website myself?",
    answer: "Yes! We build primarily on WordPress which has an intuitive admin interface. We provide comprehensive training and documentation so you can easily update content, add blog posts, and manage your site. We're also available for ongoing support and maintenance if needed.",
  },
  {
    question: "What makes your web design services different?",
    answer: "We focus on conversion-optimized design, not just aesthetics. Every website we build is strategically designed to turn visitors into customers. We combine beautiful design with proven UX principles, blazing-fast performance, and comprehensive SEO optimization to deliver measurable business results.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Got Questions?</span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight text-balance">Frequently Asked Questions</h2>
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
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <HelpCircle className="text-blue-600 flex-shrink-0" size={24} aria-hidden="true" />
                  <span className="text-lg font-bold text-black" itemProp="name">{faq.question}</span>
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
                    id={`faq-answer-${index}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed" itemProp="text">
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
