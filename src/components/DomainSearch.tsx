import { useState, type FormEvent } from "react";
import { ExternalLink, Globe2, Search } from "lucide-react";

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\s+/g, "");
}

export default function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = normalizeDomain(domain);

    if (!cleaned || !cleaned.includes(".")) {
      setError("Enter a full domain name, like mybusiness.com");
      return;
    }

    setError("");
    window.open(
      `https://lookup.icann.org/en/lookup?name=${encodeURIComponent(cleaned)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="domain-search" className="py-20 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5">
              <Globe2 size={30} />
            </div>
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Free Domain Search</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-5 font-display tracking-tight">
              Is Your Business Domain Available?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Search a domain name before you start your website. We’ll open the official ICANN lookup so you can confirm whether the domain is already registered.
            </p>
          </div>

          <div className="bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="domain-name" className="block text-sm font-bold text-gray-700">
                Enter a domain name
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="domain-name"
                    type="text"
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    placeholder="mybusiness.com"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary btn-glow px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search size={19} /> Check Domain
                </button>
              </div>
              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <ExternalLink size={14} /> Results open in the official ICANN registration lookup.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="font-bold text-black">Found the perfect domain?</p>
              <p className="text-sm text-gray-500 mt-1">
                Jay’s Web Design Services can help you build the website to go with it.
              </p>
              <a href="#estimate" className="inline-flex mt-4 text-blue-600 font-bold hover:text-blue-700">
                Get a website estimate →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
