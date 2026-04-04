import { motion } from "motion/react";
import { Star, Facebook, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Miller",
    date: "2 months ago",
    text: "Jay's Web Design transformed our business online! Our new site is fast, beautiful, and we're already seeing more leads from Google. Highly recommend for anyone in San Antonio!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "David Rodriguez",
    date: "4 months ago",
    text: "Professional, responsive, and extremely talented. They fixed our broken website and optimized it for SEO. The results have been incredible. Best web designer in Texas!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Amanda Chen",
    date: "1 month ago",
    text: "The team at Jay's is amazing. They really took the time to understand our brand and delivered a website that exceeded our expectations. Great communication throughout the process.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=amanda",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Facebook className="text-blue-600" size={24} />
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Facebook Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-3 mb-6">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" size={20} />
              ))}
              <span className="ml-2 text-black font-bold">5.0 Rating</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-600/5 border border-gray-100 relative group hover:-translate-y-2 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-8 text-blue-600/10 group-hover:text-blue-600/20 transition-colors" size={60} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-50">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-black">{review.name}</h4>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>

              <div className="flex text-yellow-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={14} />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-blue-600">
                  <Facebook size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Verified Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.facebook.com/Jayswebdesign/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            See All Facebook Reviews
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
