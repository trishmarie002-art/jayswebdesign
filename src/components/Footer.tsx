import { Mail, Phone, MapPin, Facebook, Lock } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Industries", href: "/#industries" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5" itemScope itemType="https://schema.org/WPFooter" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <Logo light size="lg" />
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Professional web design services that deliver results. We create custom, conversion-optimized websites for businesses nationwide. Based in San Antonio, Texas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Jayswebdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              {[
                "Web Design",
                "SEO Optimization",
                "Website Maintenance",
                "Website Repair",
                "Logo Design",
                "Ad Flyer Design",
              ].map((service) => (
                <li key={service}>
                  <Link to="/#services" className="text-gray-500 hover:text-blue-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic" itemScope itemType="https://schema.org/LocalBusiness">
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} aria-hidden="true" />
                <span className="text-gray-500" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">San Antonio</span>, <span itemProp="addressRegion">Texas</span>, <span itemProp="addressCountry">USA</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 flex-shrink-0" size={18} aria-hidden="true" />
                <a href="tel:2109001113" className="text-gray-500 hover:text-blue-500 transition-colors" itemProp="telephone">
                  (210) 900-1113
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 flex-shrink-0" size={18} aria-hidden="true" />
                <a
                  href="mailto:jaywebdesignsa@gmail.com"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  itemProp="email"
                >
                  jaywebdesignsa@gmail.com
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {currentYear} Jay's Web Design Services. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
            <Link 
              to="/admin" 
              className="opacity-20 hover:opacity-100 text-gray-500 hover:text-blue-500 transition-all flex items-center gap-1"
              title="Admin Login"
            >
              <Lock size={12} />
              <span className="text-[10px]">Staff</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
