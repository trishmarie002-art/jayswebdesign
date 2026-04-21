import { motion, useAnimationControls } from "motion/react";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Project {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  alt: string;
  order?: number;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-black">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  // Duplicate projects for infinite scroll effect
  const displayProjects = projects.length > 0 ? [...projects, ...projects, ...projects] : [];

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">My Work</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight leading-tight">Recent Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              I take pride in delivering high-performance websites that drive results. Explore some of my latest success stories.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Automated Scrolling Motion Section */}
      <div className="relative w-full overflow-hidden min-h-[300px]">
        {projects.length > 0 ? (
          <motion.div
            initial={{ x: 0 }}
            animate={{
              x: [0, -100 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: projects.length * 15, // Slightly slower for better readability
                ease: "linear",
              },
            }}
            whileHover={{ transition: { duration: projects.length * 50 } }} // Slow down significantly on hover
            className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
            style={{ width: "max-content" }}
          >
            {displayProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="w-[300px] sm:w-[400px] md:w-[450px] flex-shrink-0"
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
                      alt={project.alt || project.name}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4">{project.name}</h3>
                    <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-white/5 group-hover:bg-blue-600 px-4 py-2 rounded-lg transition-all">
                      Visit Website
                      <ExternalLink size={14} />
                    </div>
                  </div>
                  
                  {/* Overlay for hover */}
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-900/30 rounded-3xl border border-white/5 mx-4 md:mx-auto max-w-4xl">
            <p className="text-gray-500 italic mb-4">No projects added to the gallery yet.</p>
            <a href="/admin" className="text-blue-500 font-bold hover:underline">Go to Dashboard to add projects</a>
          </div>
        )}
      </div>
      
      <div className="mt-12 md:mt-16 text-center container mx-auto px-4">
        <p className="text-gray-500 mb-6 italic text-sm md:text-base">And many more satisfied clients across the United States...</p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-500 transition-colors text-sm md:text-base"
        >
          Ready for your own custom site? Let's talk
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  );
}
