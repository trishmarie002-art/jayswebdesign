import { motion } from "motion/react";
import { Home, Stethoscope, ShoppingBag, Utensils, Briefcase, GraduationCap } from "lucide-react";

const industries = [
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    name: "E-commerce",
    description: "Robust online stores with seamless checkout experiences and inventory management. I specialize in WooCommerce and Shopify development for local retailers.",
    features: ["Secure Checkout", "Inventory Sync", "Product SEO"]
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    name: "Professional Services",
    description: "Authoritative websites for lawyers, accountants, and consultants. I create professional digital presences that establish credibility and generate high-quality leads.",
    features: ["Case Studies", "Client Testimonials", "Secure File Sharing"]
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Industries I Serve</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">Tailored Solutions for Your Field</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Every industry has unique needs. I specialize in building custom digital experiences that address your specific challenges and drive results.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-600/5 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {industry.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{industry.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {industry.description}
              </p>
              <ul className="space-y-2">
                {industry.features.map((feature) => (
                  <li key={feature} className="flex items-center text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
