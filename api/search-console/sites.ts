import { getAccessToken } from "../../lib/searchConsole.js";

export default async function handler(req: any, res: any) {
  const token = await getAccessToken(req, res);
  if (!token) return res.status(401).json({ error: "Search Console is not connected." });

  const response = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: any = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "Unable to load Search Console properties." });

  const sites = (data.siteEntry || []).map((site: any) => ({
    siteUrl: site.siteUrl,
    permissionLevel: site.permissionLevel,
  }));
  res.status(200).json({ sites });
}
