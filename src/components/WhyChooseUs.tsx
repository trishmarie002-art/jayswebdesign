import { motion } from "motion/react";
import { Star, Shield, Zap, Heart } from "lucide-react";

const reasons = [
  {
    icon: <Zap className="w-10 h-10 text-blue-500" />,
    title: "Fast Turnaround",
    description: "We respect your time. Our efficient process ensures your website is up and running in record time without compromising quality.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-500" />,
    title: "Secure & Reliable",
    description: "Security is built-in. We use the latest standards to protect your data and ensure 99.9% uptime for your business.",
  },
  {
    icon: <Star className="w-10 h-10 text-blue-500" />,
    title: "SEO Optimized",
    description: "We don't just build sites; we build search engine magnets. Rank higher in San Antonio and nationwide searches.",
  },
  {
    icon: <Heart className="w-10 h-10 text-blue-500" />,
    title: "Dedicated Support",
    description: "We're your partners in growth. Our team is always here to help with updates, repairs, and strategic advice.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="whychooseus" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-8 leading-tight">
                Your Success is <br />
                <span className="text-blue-500">Our Mission</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                At Jay's Web Design, we believe every business deserves a powerful online presence. We combine creative design with technical excellence to deliver results that matter.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col gap-4 group p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                      {reason.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{reason.title}</h4>
                      <p className="text-gray-500 text-sm">{reason.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                {[
                  { label: "Projects Done", value: "150+" },
                  { label: "Happy Clients", value: "50+" },
                  { label: "Years Exp", value: "10+" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop"
                  alt="Work Environment"
                  referrerPolicy="no-referrer"
                  className="rounded-[3rem] shadow-2xl border border-white/10 relative z-10"
                />
                {/* Floating badge */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center font-bold text-center p-4 shadow-xl rotate-12 z-20 border-4 border-black">
                  Best in Texas
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-[3.5rem] -z-10" />
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
