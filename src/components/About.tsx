import { motion } from "motion/react";
import { CheckCircle2, Users, Globe, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <div className="lg:w-1/2 relative w-full pt-12 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340&auto=format&fit=crop"
                alt="The Designer"
                width={1170}
                height={780}
                referrerPolicy="no-referrer"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-blue-600 p-6 md:p-8 rounded-3xl shadow-xl hidden sm:block">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">10+</p>
                <p className="text-blue-100 text-sm md:font-medium">Years Experience</p>
              </div>
            </motion.div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full -z-0 hidden lg:block" />
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">About Me</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">
                Jay's Web Design: <br />
                <span className="text-blue-600">San Antonio's Best</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                I am a dedicated web designer based in the heart of San Antonio, Texas. While my roots are local, my reach is national. I specialize in creating high-converting websites that don't just look pretty—they drive real business growth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <Globe className="text-blue-600" />, title: "National Reach", desc: "Serving clients from Texas to New York." },
                  { icon: <Users className="text-blue-600" />, title: "Client Focused", desc: "Your goals are my top priority." },
                  { icon: <CheckCircle2 className="text-blue-600" />, title: "Proven Results", desc: "Websites that rank and convert." },
                  { icon: <Award className="text-blue-600" />, title: "Expert Design", desc: "Specialist in design and SEO." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm md:text-base">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-center"
              >
                Learn More About My Work
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
