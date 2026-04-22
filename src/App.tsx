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
import { siteConfig, generateHomePageSchema, primaryKeywords } from "./lib/seo";

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
  const homePageSchema = generateHomePageSchema();

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
          <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteConfig.title}</title>
            <meta name="title" content={siteConfig.title} />
            <meta name="description" content={siteConfig.description} />
            <meta name="keywords" content={primaryKeywords.join(", ")} />
            <meta name="author" content={siteConfig.name} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <meta name="bingbot" content="index, follow" />
            
            {/* Geographic Meta Tags for Local + National SEO */}
            <meta name="geo.region" content="US-TX" />
            <meta name="geo.placename" content="San Antonio" />
            <meta name="geo.position" content="29.4241;-98.4936" />
            <meta name="ICBM" content="29.4241, -98.4936" />
            
            {/* Language and Content */}
            <meta httpEquiv="content-language" content="en-US" />
            <meta name="language" content="English" />
            <meta name="rating" content="general" />
            <meta name="distribution" content="global" />
            <meta name="revisit-after" content="3 days" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteConfig.url} />
            <meta property="og:title" content={siteConfig.title} />
            <meta property="og:description" content={siteConfig.description} />
            <meta property="og:image" content={siteConfig.ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Jay's Web Design Services - Professional Web Design" />
            <meta property="og:site_name" content={siteConfig.name} />
            <meta property="og:locale" content="en_US" />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteConfig.url} />
            <meta name="twitter:title" content={siteConfig.title} />
            <meta name="twitter:description" content={siteConfig.description} />
            <meta name="twitter:image" content={siteConfig.ogImage} />
            <meta name="twitter:creator" content="@jayswebdesign" />
            <meta name="twitter:site" content="@jayswebdesign" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={siteConfig.url} />
            
            {/* Alternate Languages (for future internationalization) */}
            <link rel="alternate" hrefLang="en-US" href={siteConfig.url} />
            <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />
            
            {/* Google Site Verification */}
            <meta name="google-site-verification" content="google3d9d936012e1e974" />
            
            {/* Additional SEO Meta Tags */}
            <meta name="format-detection" content="telephone=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
            
            {/* Structured Data - Complete Schema Graph */}
            <script type="application/ld+json">
              {JSON.stringify(homePageSchema)}
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
