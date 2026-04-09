import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Facebook, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextReview = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [nextReview, isPaused]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="reviews" className="py-20 md:py-24 bg-gray-50 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2">
                <Facebook className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm">Facebook Reviews</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mt-3 mb-6 font-display tracking-tight leading-tight">What My Clients Say</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-[18px] h-[18px] md:w-5 md:h-5" />
              ))}
              <span className="ml-2 text-black font-bold text-sm md:text-base">5.0 Rating (150+ Reviews)</span>
            </div>
          </motion.div>
        </div>

        <div 
          className="relative max-w-4xl mx-auto px-2 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[480px] sm:min-h-[450px] md:min-h-[380px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextReview();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevReview();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[2rem] shadow-2xl shadow-blue-600/10 border border-gray-100 relative group overflow-hidden">
                  {/* Decorative Quote Mark */}
                  <Quote className="absolute -top-4 -right-4 text-blue-600/5 group-hover:text-blue-600/10 transition-colors w-32 h-32 md:w-40 md:h-40" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                      <div className="relative">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <span className="text-xl md:text-2xl font-black">{reviews[currentIndex].name.charAt(0)}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                          <Facebook className="text-blue-600 w-2.5 h-2.5 md:w-3 md:h-3" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-black group-hover:text-blue-600 transition-colors">{reviews[currentIndex].name}</h4>
                        <p className="text-xs md:text-sm text-gray-400 font-medium">{reviews[currentIndex].date}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                            <Star key={i} fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 drop-shadow-sm" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-base md:text-xl leading-relaxed italic mb-6 md:mb-8 relative">
                      <span className="text-blue-600 text-3xl md:text-4xl font-serif absolute -left-4 md:-left-6 -top-2 opacity-20">"</span>
                      {reviews[currentIndex].text}
                      <span className="text-blue-600 text-3xl md:text-4xl font-serif absolute -right-2 bottom-0 opacity-20">"</span>
                    </p>
                    
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Verified Facebook Review</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
          <button
            onClick={prevReview}
            className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all z-20 group"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextReview}
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all z-20 group"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Dots & Progress Indicator */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 relative overflow-hidden",
                    currentIndex === index 
                      ? "bg-blue-600 w-12" 
                      : "bg-gray-300 w-2 hover:bg-blue-300"
                  )}
                  aria-label={`Go to review ${index + 1}`}
                >
                  {currentIndex === index && !isPaused && (
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-blue-400/30"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {currentIndex + 1} / {reviews.length}
            </p>
          </div>
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
