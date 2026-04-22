import { motion } from "motion/react";
import { ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { Helmet } from "react-helmet-async";
import OptimizedImage from "../components/OptimizedImage";
import { siteConfig, generateBreadcrumbSchema } from "../lib/seo";

export default function Blog() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: "The Digital Growth Blog",
    description: "Expert advice on web design, SEO strategy, WordPress development, and digital marketing to help your business thrive online.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
      url: `${siteConfig.url}/blog/${post.id}`,
    })),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ]);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <Helmet>
        <title>Web Design Blog | SEO Tips & WordPress Guides | Jay&apos;s Web Design</title>
        <meta name="title" content="Web Design Blog | SEO Tips & WordPress Guides | Jay's Web Design" />
        <meta name="description" content="Expert advice on web design, SEO strategy, WordPress development, and digital marketing. Learn proven techniques to grow your business online and increase conversions." />
        <meta name="keywords" content="web design tips, SEO blog, WordPress tutorials, small business marketing, website optimization, digital marketing guides, responsive design tips, conversion optimization" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`${siteConfig.url}/blog`} />
        <meta property="og:title" content="Web Design Blog | SEO Tips & WordPress Guides" />
        <meta property="og:description" content="Expert advice on web design, SEO strategy, and digital marketing to help your business thrive online." />
        <meta property="og:image" content={siteConfig.ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Blog | SEO Tips & WordPress Guides" />
        <meta name="twitter:description" content="Expert advice on web design, SEO strategy, and digital marketing to help your business thrive online." />
        
        <link rel="canonical" href={`${siteConfig.url}/blog`} />
        
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Resources & Insights</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">
                The Digital Growth Blog
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed">
                Expert advice on web design, SEO strategy, and digital marketing to help your business thrive online.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group flex flex-col h-full"
              >
                <Link to={`/blog/${post.id}`} className="block aspect-video overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <User size={14} />
                      {post.author}
                    </div>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="inline-flex items-center gap-2 text-black font-bold group/btn text-sm"
                    >
                      Read Article
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to grow your business?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Let's build a website that works as hard as you do. Get a free quote for your project today.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
