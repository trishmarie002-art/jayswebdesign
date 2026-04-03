import { HelmetProvider, Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Portfolio from "./components/Portfolio";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        <Helmet>
          <title>Jay's Web Design Services | San Antonio's Best Web Design & SEO</title>
          <meta name="description" content="Professional web design, SEO, and digital marketing services in San Antonio, Texas. Serving clients nationwide with custom websites, maintenance, and branding." />
          <meta name="keywords" content="web design San Antonio, SEO Texas, website maintenance, website repair, logo design, ad flyer design, Jay's Web Design, custom websites San Antonio, digital marketing Texas" />
          <meta property="og:title" content="Jay's Web Design Services | San Antonio's Best Web Design & SEO" />
          <meta property="og:description" content="Professional web design and SEO services in San Antonio, Texas. Serving clients nationwide." />
          <meta property="og:image" content="https://jayswebdesignsa.com/og-image.jpg" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jayswebdesignsa.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Jay's Web Design Services | San Antonio's Best Web Design & SEO" />
          <meta name="twitter:description" content="Professional web design and SEO services in San Antonio, Texas." />
          <meta name="twitter:image" content="https://jayswebdesignsa.com/og-image.jpg" />
          <meta name="google-site-verification" content="google3d9d936012e1e974" />
          <link rel="canonical" href="https://jayswebdesignsa.com" />
        </Helmet>

        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Portfolio />
          <ContactForm />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </HelmetProvider>
  );
}
