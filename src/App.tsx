import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Portfolio from "./components/Portfolio";
import FAQ from "./components/FAQ";
import Industries from "./components/Industries";
import Resources from "./components/Resources";
import LeadMagnet from "./components/LeadMagnet";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Reviews />
      <Portfolio />
      <Industries />
      <Resources />
      <LeadMagnet />
      <FAQ />
      <ContactForm />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
          <Helmet>
            <title>San Antonio Web Design | Jay's Web Design Services</title>
            <meta name="description" content="Expert San Antonio web design services to grow your business. Custom, mobile-friendly websites designed to convert visitors into customers. Get a free quote!" />
            <meta name="keywords" content="San Antonio Web Design, professional web design services, hire wordpress developer, benefits of responsive web design, web design San Antonio, SEO Texas, website maintenance, website repair, logo design, ad flyer design, Jay's Web Design, custom websites San Antonio, digital marketing Texas" />
            <meta property="og:title" content="San Antonio Web Design | Jay's Web Design Services" />
            <meta property="og:description" content="Expert San Antonio web design services to grow your business. Custom, mobile-friendly websites designed to convert visitors into customers." />
            <meta property="og:image" content="https://jayswebdesignservices.com/logo.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://jayswebdesignservices.com" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="San Antonio Web Design | Jay's Web Design Services" />
            <meta name="twitter:description" content="Expert San Antonio web design services to grow your business. Custom, mobile-friendly websites designed to convert visitors into customers." />
            <meta name="twitter:image" content="https://jayswebdesignservices.com/logo.png" />
            <meta name="google-site-verification" content="google3d9d936012e1e974" />
            <link rel="canonical" href="https://jayswebdesignservices.com" />
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "name": "Jay's Web Design Services",
                  "image": "https://jayswebdesignservices.com/logo.png",
                  "@id": "https://jayswebdesignservices.com",
                  "url": "https://jayswebdesignservices.com/",
                  "telephone": "+12109001113",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "San Antonio Area",
                    "addressLocality": "San Antonio",
                    "addressRegion": "TX",
                    "addressCountry": "US"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 29.4241,
                    "longitude": -98.4936
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "4"
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                  },
                  "sameAs": [
                    "https://www.facebook.com/Jayswebdesign"
                  ]
                }
              `}
            </script>
          </Helmet>

          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </HelmetProvider>
  );
}
