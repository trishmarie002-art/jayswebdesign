import { useState, type FormEvent } from "react";
import { CheckCircle2, Globe2, Loader2, Search, XCircle } from "lucide-react";

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\s+/g, "");
}

type DomainResult = {
  domain: string;
  available: boolean;
};

export default function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<DomainResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = normalizeDomain(domain);

    if (!cleaned || !cleaned.includes(".")) {
      setResult(null);
      setError("Enter a full domain name, like mybusiness.com");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/domain-check?domain=${encodeURIComponent(cleaned)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "We could not check that domain right now.");
      }

      setResult({ domain: data.domain, available: Boolean(data.available) });
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "We could not check that domain right now.");
    } finally {
      setLoading(false);
    }
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
              Search a domain name before you start your website. Your availability result appears instantly right here without leaving Jay’s Web Design Services.
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
                    onChange={(event) => {
                      setDomain(event.target.value);
                      setError("");
                      setResult(null);
                    }}
                    placeholder="mybusiness.com"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-glow px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
                >
                  {loading ? <Loader2 size={19} className="animate-spin" /> : <Search size={19} />}
                  {loading ? "Checking..." : "Check Domain"}
                </button>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              {result && (
                <div
                  className={`rounded-2xl border p-5 flex items-start gap-3 ${
                    result.available
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {result.available ? (
                    <CheckCircle2 size={24} className="flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={24} className="flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-extrabold text-lg">
                      {result.domain} {result.available ? "looks available!" : "is already registered."}
                    </p>
                    <p className="text-sm mt-1 opacity-90">
                      {result.available
                        ? "Great choice. Domain availability can change quickly, so register it soon if you want it."
                        : "Try another name or a different extension such as .net, .co, or .us."}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Availability is checked using public domain registration data. Final availability is confirmed when the domain is registered with a registrar.
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
