import { motion, useAnimationControls } from "motion/react";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

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
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order", { ascending: true });

        if (error) {
          console.error("Error fetching projects:", error);
        } else if (data) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          fetchProjects(); // Re-fetch all to ensure order is correct, or merge manually
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-black">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight leading-tight">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              I take pride in delivering high-performance websites that drive results. Explore some of my latest work.
            </p>
          </motion.div>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="relative overflow-hidden py-10 overflow-x-hidden">
          <motion.div 
            className="flex gap-6 md:gap-10 px-4 md:px-10"
            animate={{ 
              x: projects.length >= 2 ? ["0%", "-33.33%"] : "0%" 
            }}
            transition={{ 
              duration: projects.length * 10, 
              ease: "linear", 
              repeat: Infinity 
            }}
            style={{ width: "fit-content" }}
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <a
                key={`${project.id}-${index}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all shadow-2xl block w-[300px] md:w-[500px] shrink-0"
              >
                <div className="aspect-video overflow-hidden bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.alt || project.name}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-1">View live website</p>
                  
                  <div className="text-blue-500 text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    EXPLORE PROJECT
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-white/5">
            <p className="text-gray-500 italic mb-4">No projects added to your gallery yet.</p>
            <p className="text-gray-400">Head to the admin dashboard to showcase your work!</p>
          </div>
        </div>
      )}

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
