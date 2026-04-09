import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2400&auto=format&fit=crop",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[450px] md:min-h-[500px] lg:min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-14 lg:pt-20 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Social Proof Badge - Repositioned Above the Fold */}
            <div className="flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full">
              <div className="flex text-blue-400">
                {"★".repeat(5)}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">
                5.0 Facebook Rating
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 px-2 font-display tracking-tight">
              San Antonio’s <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Premier Web Designer
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Get a high-performance website in just <span className="text-white font-bold underline decoration-blue-500">7 days</span>. I build revenue-generating assets for plumbers, gyms, and local pros designed to turn clicks into customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:8302905856"
                  className="group flex items-center justify-center gap-2 btn-primary btn-glow px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg w-full sm:w-auto"
                >
                  Start Your 7-Day Build
                  <Phone className="group-hover:scale-110 transition-transform" size={20} />
                </a>
                <span className="text-[10px] sm:text-xs text-blue-400 font-medium uppercase tracking-widest text-center">Free Strategy Consultation</span>
              </div>
              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg w-full sm:w-auto"
              >
                View Results
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8"
          >
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="Client"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-sm sm:text-base">150+ Local Businesses Served</p>
              <p className="text-gray-400 text-xs">San Antonio & Surrounding Areas</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
