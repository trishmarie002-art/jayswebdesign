import { motion } from "motion/react";
import { Star, Facebook, Quote } from "lucide-react";

const reviews = [
  {
    name: "Leo Martinez",
    date: "Recent Review",
    text: "Jay went above and beyond my expectations for an amazing price he is really sent by God to me to help me. My website looks amazing I am so grateful for his services. I would definitely recommend him to anyone who needs an honest web designer and SEO for your SEO services.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=leo",
  },
  {
    name: "Katrell Mack",
    date: "Recent Review",
    text: "Very quick and efficient work, great customer service and the product came out amazing! I would 100% recommend going to this man for your web designs, Ik if I ever need a new one this is where I’ll be coming!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=katrell",
  },
  {
    name: "Alex Deleon",
    date: "Recent Review",
    text: "Justin is the best!!! He was professional and always kept us updated and an open line of communication with us throughout the whole process. We couldn't be happier with our website. He even went above and beyond and gave us some logo ideas which we decided to go with in the end. He really gave our company the professional look that we wanted. Highly recommend to anyone looking for any web design services.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Uli Perez",
    date: "Recent Review",
    text: "One week is all it took for this co to make my dream come true! He asked all the right questions and completed as he said he would. My logo is perfect! And he put me in maps!! I am from San Antonio tx landscaping co. Alamo Ranch area! Ty again I highly recommend!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=uli",
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
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600">
                  <span className="text-xl font-bold">{review.name.charAt(0)}</span>
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
