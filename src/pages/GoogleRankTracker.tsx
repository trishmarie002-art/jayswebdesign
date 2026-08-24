import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Building2, ExternalLink, Loader2, MapPin, Search, Trophy } from "lucide-react";

type OrganicResult = {
  position: number;
  title: string;
  link: string;
  domain: string;
};

type MapResult = {
  position: number;
  title: string;
  address: string;
  rating: number;
  ratingCount: number;
  website: string;
};

type RankData = {
  keyword: string;
  website: string;
  location: string;
  checkedAt: string;
  organic: {
    found: boolean;
    position: number | null;
    title?: string;
    link?: string;
  };
  maps: {
    found: boolean;
    position: number | null;
    title?: string;
    address?: string;
    rating?: number;
    ratingCount?: number;
    website?: string;
  };
  topOrganic: OrganicResult[];
  topMaps: MapResult[];
};

export default function GoogleRankTracker() {
  const [website, setWebsite] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<RankData | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("/api/live-rank-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, keyword, location, businessName }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to check live rankings.");
      setData(result);
    } catch (err: any) {
      setError(err?.message || "Unable to check live rankings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Live Google Rank Checker | Jay's Web Design Services</title>
        <meta
          name="description"
          content="Check a website's live Google organic ranking and local Google Maps position for a keyword and location."
        />
        <link rel="canonical" href="https://jayswebdesignservices.com/google-rank-tracker" />
      </Helmet>

      <section className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300 text-sm font-semibold mb-5">
              <Search size={17} /> Live Google Search + Maps Check
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
              See Where You Rank <span className="text-blue-400">Right Now</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Enter your website, keyword and target location. We check current Google search results and local Maps results so you can see where you appear and who is ahead of you.
            </p>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8 shadow-2xl mb-8">
            <div className="grid md:grid-cols-2 gap-5">
              <label>
                <span className="block text-sm text-slate-300 mb-2">Website</span>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="example.com"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500"
                />
              </label>

              <label>
                <span className="block text-sm text-slate-300 mb-2">Keyword</span>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="plumber in san antonio tx"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500"
                />
              </label>

              <label>
                <span className="block text-sm text-slate-300 mb-2">City, State or ZIP</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="San Antonio, Texas"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500"
                />
              </label>

              <label>
                <span className="block text-sm text-slate-300 mb-2">Business name <span className="text-slate-500">(helps match Maps)</span></span>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-8 py-4 font-black transition-colors shadow-lg shadow-blue-600/20"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              {loading ? "Checking Google..." : "Check Live Rankings"}
            </button>
            <p className="text-xs text-slate-500 mt-4">Results are location-specific, non-personalized live SERP data and can change throughout the day.</p>
          </form>

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200 mb-8">
              {error}
            </div>
          )}

          {data && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-5">
                <RankCard
                  icon={<Search size={24} />}
                  label="Google Organic Rank"
                  rank={data.organic.position}
                  found={data.organic.found}
                  detail={data.organic.link || `Not found in checked organic results for ${data.keyword}`}
                />
                <RankCard
                  icon={<MapPin size={24} />}
                  label="Google Maps Rank"
                  rank={data.maps.position}
                  found={data.maps.found}
                  detail={data.maps.address || "Business listing not found in checked Maps results"}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <span><strong className="text-white">Keyword:</strong> {data.keyword}</span>
                <span><strong className="text-white">Location:</strong> {data.location}</span>
                <span><strong className="text-white">Checked:</strong> {new Date(data.checkedAt).toLocaleString()}</span>
              </div>

              <div className="grid xl:grid-cols-2 gap-8">
                <ResultsTable title="Top Organic Results" icon={<Trophy size={20} />}>
                  {data.topOrganic.map((result) => (
                    <ResultRow
                      key={`${result.position}-${result.link}`}
                      position={result.position}
                      title={result.title}
                      subtitle={result.domain}
                      href={result.link}
                      highlight={result.domain === data.website || result.domain.endsWith(`.${data.website}`)}
                    />
                  ))}
                </ResultsTable>

                <ResultsTable title="Top Google Maps Results" icon={<Building2 size={20} />}>
                  {data.topMaps.map((result) => (
                    <ResultRow
                      key={`${result.position}-${result.title}-${result.address}`}
                      position={result.position}
                      title={result.title}
                      subtitle={`${result.address}${result.rating ? ` • ${result.rating.toFixed(1)}★ (${result.ratingCount || 0})` : ""}`}
                      href={result.website}
                      highlight={Boolean(data.maps.found && data.maps.position === result.position)}
                    />
                  ))}
                </ResultsTable>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 md:p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Not where you want to be?</h3>
                <p className="text-slate-300 mb-5">Jay's Web Design Services can help with on-page SEO, local SEO, technical fixes and content strategy.</p>
                <a href="/#contact" className="inline-flex rounded-xl bg-white text-slate-950 px-6 py-3 font-bold hover:bg-slate-100">Request a Free SEO Review</a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function RankCard({ icon, label, rank, found, detail }: { icon: React.ReactNode; label: string; rank: number | null; found: boolean; detail: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="text-blue-400 mb-4">{icon}</div>
      <div className="text-sm uppercase tracking-[0.18em] text-slate-400 font-bold">{label}</div>
      <div className="text-5xl md:text-6xl font-black mt-2 mb-3">{found && rank ? `#${rank}` : "Not found"}</div>
      <div className="text-sm text-slate-400 break-all">{detail}</div>
    </div>
  );
}

function ResultsTable({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2 font-bold text-lg">
        <span className="text-blue-400">{icon}</span>{title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ResultRow({ position, title, subtitle, href, highlight }: { position: number; title: string; subtitle: string; href?: string; highlight?: boolean }) {
  return (
    <div className={`flex gap-4 px-5 py-4 border-t border-white/5 first:border-t-0 ${highlight ? "bg-emerald-500/10" : ""}`}>
      <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-black ${highlight ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-200"}`}>
        {position}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white">{title}</div>
        <div className="text-sm text-slate-400 mt-1 break-words">{subtitle}</div>
      </div>
      {href && (
        <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${title}`} className="text-slate-500 hover:text-blue-400 shrink-0 pt-1">
          <ExternalLink size={18} />
        </a>
      )}
    </div>
  );
}
