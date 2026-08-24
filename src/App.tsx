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
import PriceEstimator from "./components/PriceEstimator";
import MobileContactBar from "./components/MobileContactBar";
import ReferralRewardsSection from "./components/ReferralRewardsSection";
import DomainSearch from "./components/DomainSearch";

// Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import StateArea from "./pages/StateArea";
import ServiceAreas from "./pages/ServiceAreas";
import ReferralRewards from "./pages/ReferralRewards";
import GoogleRankTracker from "./pages/GoogleRankTracker";

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
      <DomainSearch />
      <PriceEstimator />
      <ReferralRewardsSection />
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
            <title>Cheap &amp; Affordable Web Design in TX | Jay's Web Design Services</title>
            <meta name="description" content="Need cheap &amp; affordable Web design in TX? Jay's Web Design Service is the best choice when looking for top quality affordable Web design in TX." />
            <meta name="keywords" content="Professional Web Design, Custom Website Development, Nationwide Web Design Services, Responsive Web Design USA, Small Business Website Design, Corporate Web Development, E-commerce Website Design, WordPress Developers, Shopify Experts, Landing Page Design, UI/UX Design Services, Affordable Web Design, High Converting Websites, SEO Friendly Web Design, Website Maintenance Services, Web Design for Startups, Digital Marketing Agency, Online Presence Management, Modern Web Design, Creative Web Agency, Business Branding Services, Professional Logo Design, Ad Flyer Design, Website Repair Services, Custom Mobile Apps, Enterprise Web Solutions, Local SEO Services, Google Maps Marketing, Web Hosting Solutions, Digital Growth Strategy, Custom Portfolios, Real Estate Web Design, Law Firm Website Design, Medical Web Design, Construction Website Design, Restaurant Website Design, Non-Profit Web Design, Educational Web Design, Travel Website Design, E-commerce Strategy, Web Design Consultation, Freelance Web Designer, Senior Web Developer, Full Stack Development, Front End Design, Backend Web Development, Website Performance Optimization, Conversion Rate Optimization, Digital Transformation, Jay's Web Design Services" />
            <meta property="og:title" content="Cheap &amp; Affordable Web Design in TX | Jay's Web Design Services" />
            <meta property="og:description" content="Need cheap &amp; affordable Web design in TX? Jay's Web Design Service is the best choice when looking for top quality affordable Web design in TX." />
            <meta property="og:image" content="https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay%27s%20Web%20Design%20Services/logo-removebg-preview.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://jayswebdesignservices.com" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Cheap &amp; Affordable Web Design in TX | Jay's Web Design Services" />
            <meta name="twitter:description" content="Need cheap &amp; affordable Web design in TX? Jay's Web Design Service is the best choice when looking for top quality affordable Web design in TX." />
            <meta name="twitter:image" content="https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay%27s%20Web%20Design%20Services/logo-removebg-preview.png" />
            <meta name="google-site-verification" content="google3d9d936012e1e974" />
            <link rel="canonical" href="https://jayswebdesignservices.com/" />
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "name": "Jay's Web Design Services",
                  "image": "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay%27s%20Web%20Design%20Services/logo-removebg-preview.png",
                  "@id": "https://jayswebdesignservices.com",
                  "url": "https://jayswebdesignservices.com/",
                  "telephone": "+18302905856",
                  "description": "Affordable web design in TX for small businesses, including responsive websites, SEO-friendly development, maintenance, repairs, logos, and digital marketing materials.",
                  "areaServed": {
                    "@type": "State",
                    "name": "Texas"
                  },
                  "priceRange": "$$",
                  "knowsAbout": [
                    "Affordable web design in TX",
                    "Texas small business web design",
                    "Responsive website development",
                    "Search engine optimization",
                    "Website maintenance"
                  ],
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
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/referral-rewards" element={<ReferralRewards />} />
              <Route path="/google-rank-tracker" element={<GoogleRankTracker />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/:slug" element={<StateArea />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
          <MobileContactBar />
        </div>
      </Router>
    </HelmetProvider>
  );
}
