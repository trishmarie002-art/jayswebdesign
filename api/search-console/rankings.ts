import { getAccessToken } from "../../lib/searchConsole";

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function handler(req: any, res: any) {
  const token = await getAccessToken(req, res);
  if (!token) return res.status(401).json({ error: "Search Console is not connected." });

  const siteUrl = String(req.query?.siteUrl || "");
  const days = Math.min(Math.max(Number(req.query?.days || 28), 1), 90);
  if (!siteUrl) return res.status(400).json({ error: "A Search Console property is required." });

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: isoDate(start),
      endDate: isoDate(end),
      dimensions: ["query", "page"],
      rowLimit: 25000,
      dataState: "final",
    }),
  });

  const data: any = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "Unable to load Search Console ranking data." });

  const rows = (data.rows || []).map((row: any) => ({
    query: row.keys?.[0] || "",
    page: row.keys?.[1] || "",
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  })).sort((a: any, b: any) => b.impressions - a.impressions);

  const totalClicks = rows.reduce((sum: number, row: any) => sum + row.clicks, 0);
  const totalImpressions = rows.reduce((sum: number, row: any) => sum + row.impressions, 0);
  const weightedPosition = totalImpressions
    ? rows.reduce((sum: number, row: any) => sum + row.position * row.impressions, 0) / totalImpressions
    : 0;

  res.status(200).json({
    rows,
    summary: {
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalImpressions ? totalClicks / totalImpressions : 0,
      averagePosition: weightedPosition,
    },
    range: { startDate: isoDate(start), endDate: isoDate(end) },
  });
}
