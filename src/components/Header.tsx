import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Industries", href: "/#industries" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Live Rank Checker", href: "/google-rank-tracker" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isLinkActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-black/95 backdrop-blur-md py-2 shadow-2xl border-b border-white/10" 
          : "bg-transparent py-3 md:py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo light size="md" className="scale-105 md:scale-110 origin-left" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isLinkActive(link.href) ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:8302905856"
              className="btn-primary btn-glow px-5 py-2 rounded-full text-sm font-semibold"
            >
              Start Your Build
            </a>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    isLinkActive(link.href) ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:8302905856"
                className="btn-primary btn-glow text-center py-3 rounded-xl font-bold mt-2"
                onClick={() => setIsOpen(false)}
              >
                Start Your Build
              </a>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-800 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />
                  (830) 290-5856
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  jaywebdesignsa@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
