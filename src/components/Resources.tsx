import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function Resources() {
  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Resources & Insights</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">Latest from the Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Expert advice on web design, <Link to="/blog" className="text-blue-600 hover:underline">SEO strategy</Link>, and digital marketing to help your business thrive online.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group flex flex-col h-full"
            >
              <Link to={`/blog/${article.id}`} className="block aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                </div>
                <Link to={`/blog/${article.id}`}>
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link 
                  to={`/blog/${article.id}`} 
                  className="mt-auto inline-flex items-center gap-2 text-black font-bold group/btn"
                >
                  Read More
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 btn-primary btn-glow px-8 py-4 rounded-xl font-bold"
          >
            View All Articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
