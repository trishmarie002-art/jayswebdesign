import { motion } from "motion/react";
import { ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { cn } from "../lib/utils";

interface Project {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  alt: string;
  order?: number;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Pure View Cleaning Solutions",
    url: "https://pvcstexas.com/",
    image: "https://s0.wp.com/mshots/v1/https://pvcstexas.com/?w=800",
    category: "Cleaning Services",
    alt: "Modern cleaning services website for Pure View Cleaning Solutions",
    order: 0
  },
  {
    id: "p2",
    name: "Plumb Daddy Plumbing",
    url: "https://plumbdaddy-texas.com/",
    image: "https://s0.wp.com/mshots/v1/https://plumbdaddy-texas.com/?w=800",
    category: "Plumbing Services",
    alt: "Professional plumbing website design for Plumb Daddy Texas",
    order: 1
  },
  {
    id: "p3",
    name: "Rush Wheels & Tires",
    url: "https://rushwheelandtire.com/",
    image: "https://s0.wp.com/mshots/v1/https://rushwheelandtire.com/?w=800",
    category: "Automotive",
    alt: "Responsive automotive website for Rush Wheels & Tires",
    order: 2
  },
  {
    id: "p4",
    name: "Reycom Combat Gym",
    url: "https://reycom.com/",
    image: "https://s0.wp.com/mshots/v1/https://reycom.com/?w=800",
    category: "Fitness & MMA",
    alt: "High-conversion fitness and MMA gym website",
    order: 3
  },
  {
    id: "p5",
    name: "Texas Stitchworx",
    url: "https://texasstitchworx.com/",
    image: "https://s0.wp.com/mshots/v1/https://texasstitchworx.com/?w=800",
    category: "Custom Embroidery",
    alt: "Custom e-commerce website for Texas Stitchworx",
    order: 4
  },
  {
    id: "p6",
    name: "Lio's Handyman Services",
    url: "https://liothehandyman.com/",
    image: "https://s0.wp.com/mshots/v1/https://liothehandyman.com/?w=800",
    category: "Home Maintenance",
    alt: "Local handyman services website",
    order: 5
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Project[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as Project);
          });
          setProjects(list);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error fetching projects, using fallback:", error);
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Continuous auto-scroll loop that pauses on hover
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || projects.length === 0) return;

    let animationFrameId: number;

    const autoScroll = () => {
      if (!isHovered && container) {
        container.scrollLeft += 1;
        // The list is repeated 3 times. When scrollLeft exceeds 1/3 of the total scrollable width, wrap seamlessly.
        const oneSetWidth = container.scrollWidth / 3;
        if (oneSetWidth > 0 && container.scrollLeft >= oneSetWidth) {
          container.scrollLeft -= oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, projects]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const oneSetWidth = container.scrollWidth / 3;
    const scrollDistance = container.clientWidth * 0.75; // Scroll ~1-2 items

    if (direction === "left") {
      if (container.scrollLeft <= 10 && oneSetWidth > 0) {
        container.scrollLeft += oneSetWidth;
      }
      container.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    } else {
      if (container.scrollLeft >= oneSetWidth * 2 && oneSetWidth > 0) {
        container.scrollLeft -= oneSetWidth;
      }
      container.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

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
        <div 
          className="relative py-10 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll projects left"
            className={cn(
              "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30",
              "w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/85 hover:bg-blue-600 text-white",
              "border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center",
              "transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            )}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll projects right"
            className={cn(
              "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30",
              "w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/85 hover:bg-blue-600 text-white",
              "border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center",
              "transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            )}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          {/* Side Fade Overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

          {/* Horizontally Scrollable Projects Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-10 px-6 md:px-16 overflow-x-auto no-scrollbar scroll-smooth py-4 select-none"
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <a
                key={`${project.id}-${index}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all shadow-2xl block w-[300px] md:w-[500px] shrink-0"
              >
                <div className="aspect-video overflow-hidden bg-gray-800 relative">
                  <img
                    src={project.image}
                    alt={project.alt || project.name}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full transform translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 shadow-lg">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover/card:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-1">View live website</p>
                  
                  <div className="text-blue-500 text-sm font-bold flex items-center gap-2 group-hover/card:translate-x-1 transition-transform">
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
          </div>
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

