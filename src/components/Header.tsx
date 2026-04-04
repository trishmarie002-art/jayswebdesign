import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <Logo light size="md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="sms:+18302905856?body=I'm%20ready%20for%20my%20free%20strategy%20chat"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
            >
              Free Strategy Chat
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-blue-400 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="sms:+18302905856?body=I'm%20ready%20for%20my%20free%20strategy%20chat"
                className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold mt-2"
                onClick={() => setIsOpen(false)}
              >
                Free Strategy Chat
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
