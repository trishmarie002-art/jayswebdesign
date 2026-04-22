import { motion } from "motion/react";
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import OptimizedImage from "../components/OptimizedImage";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <Helmet>
        <title>{post.title} | Jay's Web Design San Antonio</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <User size={14} />
                  {post.author}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black mb-8 font-display tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed italic border-l-4 border-blue-600 pl-6">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl mb-16"
            >
              <OptimizedImage
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                sizes="(max-width: 768px) 100vw, 800px"
                priority={true}
                className="w-full h-auto aspect-video"
              />
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-3/4">
                <div className="markdown-body prose prose-lg prose-blue max-w-none">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
                
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Share:</span>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                        <Facebook size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                        <Twitter size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                        <Linkedin size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-500">{post.category}</span>
                  </div>
                </div>
              </div>

              <aside className="lg:w-1/4">
                <div className="sticky top-32 space-y-12">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h3 className="text-xl font-bold text-black mb-4">About the Author</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        J
                      </div>
                      <div>
                        <p className="font-bold text-black">Jay</p>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Web Designer</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      I specialize in building high-performance websites that drive results for small businesses in San Antonio and beyond.
                    </p>
                  </div>

                  <div className="bg-black p-8 rounded-3xl text-white">
                    <h3 className="text-xl font-bold mb-4">Need a website?</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Let's build a custom digital presence that helps your business grow.
                    </p>
                    <Link
                      to="/#contact"
                      className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-xl font-bold transition-all"
                    >
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-black mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(p => p.id !== id).slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
