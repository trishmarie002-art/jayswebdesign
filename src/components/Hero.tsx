import { motion } from "motion/react";
import { Phone, ChevronRight } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";

export default function Hero() {
  const { content } = useSiteContent("hero", {
    heroTitle: "America's|Premier Web Designer",
    heroSubtitle: "Get a high-performance website in just 72 hours. I build revenue-generating assets for businesses nationwide, designed to turn clicks into customers.",
  });

  return (
    <section id="home" className="relative min-h-[450px] md:min-h-[500px] lg:min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        >
          <source src="https://pub-d0383005f8d24f9bbf6ce1a6abc39c3e.r2.dev/Jays-web-design-services.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-12 md:pt-40 md:pb-14 lg:pt-56 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Social Proof Badge */}
            <div className="flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full">
              <div className="flex text-blue-400">
                {"★".repeat(5)}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">
                5.0 Facebook Rating
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 px-2 font-display tracking-tight [text-shadow:_0_4px_8px_rgba(0,0,0,0.8)]">
              {content.heroTitle.split("|")[0]} <br className="hidden sm:block" />
              <span className="text-blue-500 [text-shadow:_0_0_30px_rgba(59,130,246,0.8),_0_2px_4px_rgba(0,0,0,0.8)] brightness-110">
                {content.heroTitle.split("|")[1] || "Premier Web Designer"}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)] font-medium">
              {content.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:8302905856"
                  className="group flex items-center justify-center gap-2 btn-primary btn-glow px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg w-full sm:w-auto"
                >
                  Start Your 72-Hour Build
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
                <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black bg-gray-800 overflow-hidden relative">
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 130}`}
                    alt="Client"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-sm sm:text-base">150+ Businesses Served Nationwide</p>
              <p className="text-gray-400 text-xs">Serving All 50 States</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
