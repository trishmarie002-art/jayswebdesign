import { motion } from "motion/react";
import { ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface Project {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  alt: string;
  order?: number;
  featured?: boolean;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Pure View Cleaning Solutions",
    url: "https://pvcstexas.com/",
    image: "https://s0.wp.com/mshots/v1/https://pvcstexas.com/?w=800",
    category: "Cleaning Services",
    alt: "Modern cleaning services website for Pure View Cleaning Solutions",
    order: 0,
    featured: true,
  },
  {
    id: "p2",
    name: "Plumb Daddy Plumbing",
    url: "https://plumbdaddy-texas.com/",
    image: "https://s0.wp.com/mshots/v1/https://plumbdaddy-texas.com/?w=800",
    category: "Plumbing Services",
    alt: "Professional plumbing website design for Plumb Daddy Texas",
    order: 1,
    featured: true,
  },
  {
    id: "p3",
    name: "Rush Wheels & Tires",
    url: "https://rushwheelandtire.com/",
    image: "https://s0.wp.com/mshots/v1/https://rushwheelandtire.com/?w=800",
    category: "Automotive",
    alt: "Responsive automotive website for Rush Wheels & Tires",
    order: 2,
    featured: true,
  },
  {
    id: "p4",
    name: "Reycom Combat Gym",
    url: "https://reycom.com/",
    image: "https://s0.wp.com/mshots/v1/https://reycom.com/?w=800",
    category: "Fitness & MMA",
    alt: "High-conversion fitness and MMA gym website",
    order: 3,
    featured: true,
  },
  {
    id: "p5",
    name: "Texas Stitchworx",
    url: "https://texasstitchworx.com/",
    image: "https://s0.wp.com/mshots/v1/https://texasstitchworx.com/?w=800",
    category: "Custom Embroidery",
    alt: "Custom e-commerce website for Texas Stitchworx",
    order: 4,
    featured: true,
  },
  {
    id: "p6",
    name: "Lio's Handyman Services",
    url: "https://liothehandyman.com/",
    image: "https://s0.wp.com/mshots/v1/https://liothehandyman.com/?w=800",
    category: "Home Maintenance",
    alt: "Local handyman services website",
    order: 5,
    featured: true,
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-black">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  const explicitlyFeatured = projects.filter((project) => project.featured === true);
  const featuredProjects = (explicitlyFeatured.length > 0 ? explicitlyFeatured : projects).slice(0, 6);

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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight leading-tight">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              A few featured websites built for businesses across different industries.
            </p>
          </motion.div>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all shadow-2xl block"
              >
                <div className="aspect-video overflow-hidden bg-gray-800 relative">
                  <img
                    src={project.image}
                    alt={project.alt || project.name}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <ExternalLink size={18} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="text-gray-400 text-sm">View live website</div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-white/5">
            <p className="text-gray-500 italic">No featured projects are available yet.</p>
          </div>
        )}

        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            View Full Portfolio
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
