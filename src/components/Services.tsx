import { motion } from "motion/react";
import { Code, Search, Settings, Wrench, Layout, Palette, ChevronRight } from "lucide-react";

const services = [
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Web Design",
    description: "Custom, responsive websites designed to capture your brand's essence and convert visitors into customers.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO Services",
    description: "High-ranking SEO strategies to ensure your business is found by the right people in local and nationwide markets.",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Website Maintenance",
    description: "Ongoing support to keep your site secure, updated, and performing at its peak 24/7.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Website Repair",
    description: "Fast and reliable fixes for broken links, slow loading times, and technical glitches.",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Logos & Branding",
    description: "Memorable visual identities that make your business stand out from the competition.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Ad Flyer Design",
    description: "Professional digital and print flyers that grab attention and drive engagement for your campaigns.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">My Expertise</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">Comprehensive Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              From initial concept to ongoing maintenance, I provide everything you need to succeed in the digital landscape.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-600/5 transition-all group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                {service.description}
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-all group/link hover:translate-x-1"
              >
                Request a Free Quote
                <ChevronRight size={14} className="ml-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
