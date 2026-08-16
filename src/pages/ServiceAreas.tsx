import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { stateAreas } from "../data/stateAreas";

export default function ServiceAreas() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <Helmet>
        <title>Web Design Service Areas | Jay's Web Design Services</title>
        <meta name="description" content="Explore affordable web design services for small businesses in Texas, California, Florida, New York, Georgia, and North Carolina." />
        <link rel="canonical" href="https://jayswebdesignservices.com/service-areas" />
      </Helmet>

      <section className="bg-black text-white py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Remote Web Design Services</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4">Affordable Web Design Service Areas</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
            Jay's Web Design Services works remotely with small businesses in Texas and selected markets across the United States.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <Link to="/" className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all group">
              <MapPin className="text-blue-600 mb-5" size={30} />
              <h2 className="text-2xl font-bold text-black">Affordable Web Design in Texas</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">Our primary statewide service page for Texas small businesses.</p>
              <span className="inline-flex items-center gap-2 text-blue-600 font-bold mt-6">View Texas Services <ArrowRight size={17} /></span>
            </Link>
            {stateAreas.map((area) => (
              <Link key={area.slug} to={`/${area.slug}`} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all group">
                <MapPin className="text-blue-600 mb-5" size={30} />
                <h2 className="text-2xl font-bold text-black">{area.title}</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">{area.metaDescription}</p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-bold mt-6">Explore {area.state} <ArrowRight size={17} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
