import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, MapPin, Phone, ArrowRight } from "lucide-react";
import { stateAreas } from "../data/stateAreas";

export default function StateArea() {
  const { slug } = useParams<{ slug: string }>();
  const area = stateAreas.find((item) => item.slug === slug);

  if (!area) {
    return <Navigate to="/service-areas" replace />;
  }

  const canonical = `https://jayswebdesignservices.com/${area.slug}`;
  const relatedAreas = stateAreas.filter((item) => item.slug !== area.slug);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <Helmet>
        <title>{area.title} | Jay's Web Design</title>
        <meta name="description" content={area.metaDescription} />
        <meta property="og:title" content={area.title} />
        <meta property="og:description" content={area.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: area.title,
            serviceType: "Web design and website development",
            description: area.metaDescription,
            url: canonical,
            areaServed: {
              "@type": "State",
              name: area.state,
            },
            provider: {
              "@type": "ProfessionalService",
              name: "Jay's Web Design Services",
              url: "https://jayswebdesignservices.com/",
              telephone: "+18302905856",
            },
          })}
        </script>
      </Helmet>

      <section className="bg-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <MapPin size={16} />
            Serving businesses throughout {area.state}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl mx-auto leading-tight font-display">
            Affordable Web Design in <span className="text-blue-500">{area.state}</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-7 leading-relaxed">
            {area.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="tel:8302905856" className="btn-primary btn-glow px-8 py-4 rounded-xl font-bold inline-flex items-center justify-center gap-2">
              <Phone size={19} />
              Call (830) 290-5856
            </a>
            <Link to="/#contact" className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-bold inline-flex items-center justify-center gap-2">
              Request a Free Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">{area.state} Small-Business Websites</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-black mt-3 mb-6">{area.marketHeading}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{area.introduction}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{area.marketContent}</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">{area.approachHeading}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{area.approachContent}</p>
              <h3 className="font-bold text-black mb-4">Popular {area.state} service areas</h3>
              <div className="flex flex-wrap gap-2">
                {area.cities.map((city) => (
                  <span key={city} className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">What your {area.state} business website can include</h2>
            <p className="text-gray-600 text-lg mt-5">A focused plan built around the features that help your customers and support your goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {area.benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-3xl p-8 border border-gray-100">
                <CheckCircle2 className="text-blue-600 mb-5" size={32} />
                <h3 className="text-xl font-bold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 bg-black text-white rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-extrabold">Industries we can support in {area.state}</h2>
                <p className="text-gray-400 mt-4">Every website is adjusted to the buying process, content needs, and customer expectations of your industry.</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {area.industries.map((industry) => (
                  <li key={industry} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-12">
            {area.state} Web Design FAQs
          </h2>
          <div className="space-y-5">
            {area.faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <h3 className="text-xl font-bold text-black mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">Ready for affordable web design in {area.state}?</h2>
            <p className="text-blue-100 text-lg mt-5 max-w-2xl mx-auto">
              Tell us about your business and receive a practical website recommendation based on your goals and budget.
            </p>
            <Link to="/#contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold mt-8 hover:bg-blue-50 transition-colors">
              Get Your Free Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-400/40">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-100 text-center mb-5">Explore other service areas</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium">Texas</Link>
              {relatedAreas.map((item) => (
                <Link key={item.slug} to={`/${item.slug}`} className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                  {item.state}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
