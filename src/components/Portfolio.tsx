import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Pure View Cleaning Solutions",
    url: "https://pvcstexas.com/",
    image: "https://s0.wp.com/mshots/v1/https://pvcstexas.com/?w=800",
    category: "Cleaning Services",
  },
  {
    name: "Plumb Daddy Plumbing",
    url: "https://plumbdaddy-texas.com/",
    image: "https://s0.wp.com/mshots/v1/https://plumbdaddy-texas.com/?w=800",
    category: "Plumbing Services",
  },
  {
    name: "Rush Wheels & Tires",
    url: "https://rushwheelandtire.com/",
    image: "https://s0.wp.com/mshots/v1/https://rushwheelandtire.com/?w=800",
    category: "Automotive",
  },
  {
    name: "Reycom Combat Gym",
    url: "https://reycom.com/",
    image: "https://s0.wp.com/mshots/v1/https://reycom.com/?w=800",
    category: "Fitness & MMA",
  },
  {
    name: "Texas Stitchworx",
    url: "https://texasstitchworx.com/",
    image: "https://s0.wp.com/mshots/v1/https://texasstitchworx.com/?w=800",
    category: "Custom Embroidery",
  },
  {
    name: "Lio's Handyman Services",
    url: "https://liothehandyman.com/",
    image: "https://s0.wp.com/mshots/v1/https://liothehandyman.com/?w=800",
    category: "Home Maintenance",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">My Work</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight leading-tight">Recent Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              I take pride in delivering high-performance websites that drive results. Explore some of my latest success stories.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all h-full"
              >
                <div className="aspect-video overflow-hidden bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{project.name}</h3>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/5 group-hover:bg-blue-600 px-4 py-2 rounded-lg transition-all">
                    Visit Website
                    <ExternalLink size={14} />
                  </div>
                </div>
                
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 italic">And many more satisfied clients across the United States...</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-500 transition-colors"
          >
            Ready for your own custom site? Let's talk
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
