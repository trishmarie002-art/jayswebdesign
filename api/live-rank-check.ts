function normalizeDomain(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

function normalizeText(input: string) {
  return input.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Live rank checker is not configured yet. Add SERPER_API_KEY in Vercel." });
  }

  const keyword = String(req.body?.keyword || "").trim();
  const website = String(req.body?.website || "").trim();
  const location = String(req.body?.location || "").trim();
  const businessName = String(req.body?.businessName || "").trim();

  if (!keyword || !website || !location) {
    return res.status(400).json({ error: "Keyword, website, and location are required." });
  }

  const domain = normalizeDomain(website);
  if (!domain || !domain.includes(".")) {
    return res.status(400).json({ error: "Enter a valid website domain." });
  }

  const headers = {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  };

  try {
    const [searchResponse, mapsResponse] = await Promise.all([
      fetch("https://google.serper.dev/search", {
        method: "POST",
        headers,
        body: JSON.stringify({
          q: keyword,
          location,
          gl: "us",
          hl: "en",
          num: 100,
        }),
      }),
      fetch("https://google.serper.dev/maps", {
        method: "POST",
        headers,
        body: JSON.stringify({
          q: keyword,
          location,
          gl: "us",
          hl: "en",
        }),
      }),
    ]);

    const searchData: any = await searchResponse.json();
    const mapsData: any = await mapsResponse.json();

    if (!searchResponse.ok) {
      return res.status(searchResponse.status).json({ error: searchData?.message || searchData?.error || "Unable to check Google organic rankings." });
    }

    if (!mapsResponse.ok) {
      return res.status(mapsResponse.status).json({ error: mapsData?.message || mapsData?.error || "Unable to check Google Maps rankings." });
    }

    const organicResults = Array.isArray(searchData?.organic) ? searchData.organic : [];
    const organicMatch = organicResults.find((item: any) => {
      const resultDomain = normalizeDomain(String(item?.link || ""));
      return resultDomain === domain || resultDomain.endsWith(`.${domain}`);
    });

    const places = Array.isArray(mapsData?.places) ? mapsData.places : [];
    const normalizedBusinessName = normalizeText(businessName);
    const mapsMatch = places.find((place: any) => {
      const placeDomain = normalizeDomain(String(place?.website || ""));
      const websiteMatches = placeDomain && (placeDomain === domain || placeDomain.endsWith(`.${domain}`));
      const nameMatches = normalizedBusinessName && normalizeText(String(place?.title || "")).includes(normalizedBusinessName);
      return websiteMatches || nameMatches;
    });

    const topOrganic = organicResults.slice(0, 10).map((item: any) => ({
      position: Number(item.position || 0),
      title: String(item.title || ""),
      link: String(item.link || ""),
      domain: normalizeDomain(String(item.link || "")),
    }));

    const topMaps = places.slice(0, 10).map((place: any) => ({
      position: Number(place.position || 0),
      title: String(place.title || ""),
      address: String(place.address || ""),
      rating: Number(place.rating || 0),
      ratingCount: Number(place.ratingCount || 0),
      website: String(place.website || ""),
    }));

    return res.status(200).json({
      keyword,
      website: domain,
      location,
      checkedAt: new Date().toISOString(),
      organic: organicMatch
        ? {
            found: true,
            position: Number(organicMatch.position || 0),
            title: String(organicMatch.title || ""),
            link: String(organicMatch.link || ""),
          }
        : { found: false, position: null },
      maps: mapsMatch
        ? {
            found: true,
            position: Number(mapsMatch.position || 0),
            title: String(mapsMatch.title || ""),
            address: String(mapsMatch.address || ""),
            rating: Number(mapsMatch.rating || 0),
            ratingCount: Number(mapsMatch.ratingCount || 0),
            website: String(mapsMatch.website || ""),
          }
        : { found: false, position: null },
      topOrganic,
      topMaps,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || "Unable to complete the live Google rank check." });
  }
}
