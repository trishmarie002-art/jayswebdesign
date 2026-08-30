import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Project[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Project);
        });
        setProjects(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading portfolio:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Web Design Portfolio | Jay's Web Design Services</title>
        <meta
          name="description"
          content="Browse website projects created by Jay's Web Design Services for businesses across a variety of industries."
        />
        <link rel="canonical" href="https://jayswebdesignservices.com/portfolio" />
      </Helmet>

      <section className="min-h-screen bg-black text-white pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Our Work</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-3 mb-5 tracking-tight">
              Full Portfolio
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              Browse all of the websites currently featured in our portfolio. Click any project to visit the live site.
            </p>
          </div>

          {loading ? (
            <div className="py-24 flex justify-center">
              <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min((index % 6) * 0.05, 0.25) }}
                  className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all shadow-2xl"
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
                      <ExternalLink size={18} />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h2>
                    <p className="text-gray-400 text-sm">View live website</p>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-white/5 max-w-4xl mx-auto">
              <p className="text-gray-400">No portfolio projects are available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
