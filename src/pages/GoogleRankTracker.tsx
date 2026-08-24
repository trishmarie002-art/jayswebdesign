import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUp, BarChart3, ExternalLink, Loader2, Search, ShieldCheck, Target } from "lucide-react";

type Site = {
  siteUrl: string;
  permissionLevel?: string;
};

type RankingRow = {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Summary = {
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
};

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value || 0));

export default function GoogleRankTracker() {
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [rows, setRows] = useState<RankingRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [filter, setFilter] = useState("");
  const [days, setDays] = useState(28);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/search-console/status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setConnected(Boolean(data.connected));
        if (data.connected) return fetchSites();
      })
      .catch(() => setConnected(false))
      .finally(() => setChecking(false));
  }, []);

  const fetchSites = async () => {
    const res = await fetch("/api/search-console/sites", { credentials: "include" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unable to load Search Console properties.");
    const list = Array.isArray(data.sites) ? data.sites : [];
    setSites(list);
    if (list.length) setSelectedSite((current) => current || list[0].siteUrl);
  };

  const loadRankings = async () => {
    if (!selectedSite) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ siteUrl: selectedSite, days: String(days) });
      const res = await fetch(`/api/search-console/rankings?${params.toString()}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load ranking data.");
      setRows(data.rows || []);
      setSummary(data.summary || null);
    } catch (err: any) {
      setError(err.message || "Unable to load ranking data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && selectedSite) loadRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSite, days, connected]);

  const filteredRows = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => row.query.toLowerCase().includes(term) || row.page.toLowerCase().includes(term));
  }, [rows, filter]);

  return (
    <>
      <Helmet>
        <title>Free Google Rank Tracker | Jay's Web Design Services</title>
        <meta name="description" content="Connect Google Search Console and view your real Google keywords, average ranking positions, clicks, impressions, CTR, and ranking pages for free." />
        <link rel="canonical" href="https://jayswebdesignservices.com/google-rank-tracker" />
      </Helmet>

      <section className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300 text-sm font-semibold mb-5">
              <BarChart3 size={17} /> 100% Free Google Search Console Data
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
              See What Your Website <span className="text-blue-400">Ranks For on Google</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Connect your Google Search Console account to see the keywords bringing your website into Google Search, your average positions, clicks, impressions and ranking pages.
            </p>
          </div>

          {checking ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-400" size={34} /></div>
          ) : !connected ? (
            <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-7 md:p-10 shadow-2xl text-center">
              <ShieldCheck className="mx-auto text-emerald-400 mb-4" size={46} />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Connect Google Search Console</h2>
              <p className="text-slate-300 mb-7">
                You'll sign in securely with Google and choose an account that has access to your website in Search Console. Jay's Web Design Services never receives or stores your Google password.
              </p>
              <a href="/api/search-console/connect" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-7 py-4 font-bold transition-colors shadow-lg shadow-blue-600/20">
                Connect Google Search Console <ExternalLink size={18} />
              </a>
              <p className="text-xs text-slate-500 mt-5">Google's Search Console API is free to use. Data is provided directly by Google.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col lg:flex-row gap-4 lg:items-end">
                <label className="flex-1">
                  <span className="block text-sm text-slate-400 mb-2">Search Console property</span>
                  <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500">
                    {sites.map((site) => <option key={site.siteUrl} value={site.siteUrl}>{site.siteUrl}</option>)}
                  </select>
                </label>
                <label className="lg:w-44">
                  <span className="block text-sm text-slate-400 mb-2">Date range</span>
                  <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500">
                    <option value={7}>Last 7 days</option>
                    <option value={28}>Last 28 days</option>
                    <option value={90}>Last 3 months</option>
                  </select>
                </label>
                <a href="/api/search-console/disconnect" className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 text-center">Disconnect</a>
              </div>

              {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="Clicks" value={summary ? formatNumber(summary.clicks) : "—"} icon={<Target size={20} />} />
                <MetricCard label="Impressions" value={summary ? formatNumber(summary.impressions) : "—"} icon={<BarChart3 size={20} />} />
                <MetricCard label="Average CTR" value={summary ? `${(summary.ctr * 100).toFixed(1)}%` : "—"} icon={<ArrowUp size={20} />} />
                <MetricCard label="Average Position" value={summary ? `#${summary.averagePosition.toFixed(1)}` : "—"} icon={<Search size={20} />} />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Your Google Keywords</h2>
                    <p className="text-sm text-slate-400">Average position is based on actual Google Search Console performance data.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter keyword or URL..." className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-slate-900/80 text-slate-400">
                      <tr>
                        <th className="text-left px-5 py-4">Keyword</th>
                        <th className="text-left px-5 py-4">Ranking Page</th>
                        <th className="text-right px-5 py-4">Position</th>
                        <th className="text-right px-5 py-4">Clicks</th>
                        <th className="text-right px-5 py-4">Impressions</th>
                        <th className="text-right px-5 py-4">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={6} className="px-5 py-16 text-center text-slate-400"><Loader2 className="animate-spin inline mr-2" size={20} /> Loading Google ranking data...</td></tr>
                      ) : filteredRows.length ? filteredRows.map((row, index) => (
                        <tr key={`${row.query}-${row.page}-${index}`} className="border-t border-white/5 hover:bg-white/[0.03]">
                          <td className="px-5 py-4 font-medium text-white">{row.query}</td>
                          <td className="px-5 py-4 text-slate-400 max-w-[360px] truncate" title={row.page}>{row.page}</td>
                          <td className="px-5 py-4 text-right"><PositionBadge position={row.position} /></td>
                          <td className="px-5 py-4 text-right">{formatNumber(row.clicks)}</td>
                          <td className="px-5 py-4 text-right">{formatNumber(row.impressions)}</td>
                          <td className="px-5 py-4 text-right">{(row.ctr * 100).toFixed(1)}%</td>
                        </tr>
                      )) : (
                        <tr><td colSpan={6} className="px-5 py-14 text-center text-slate-400">No keyword data found for this selection.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 md:p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Found keywords stuck on Page 2?</h3>
                <p className="text-slate-300 mb-5">Jay's Web Design Services can help improve your website's SEO, content and technical setup.</p>
                <a href="/#contact" className="inline-flex rounded-xl bg-white text-slate-950 px-6 py-3 font-bold hover:bg-slate-100">Request a Free SEO Review</a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-blue-400 mb-3">{icon}</div><div className="text-2xl md:text-3xl font-black">{value}</div><div className="text-sm text-slate-400 mt-1">{label}</div></div>;
}

function PositionBadge({ position }: { position: number }) {
  const rounded = Number(position.toFixed(1));
  const pageOne = rounded <= 10;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-bold ${pageOne ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>{pageOne ? <ArrowUp size={14} /> : <ArrowDown size={14} />}#{rounded}</span>;
}
