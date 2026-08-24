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

const US_STATES: Record<string, string> = {
  al: "alabama", ak: "alaska", az: "arizona", ar: "arkansas", ca: "california", co: "colorado",
  ct: "connecticut", de: "delaware", fl: "florida", ga: "georgia", hi: "hawaii", id: "idaho",
  il: "illinois", in: "indiana", ia: "iowa", ks: "kansas", ky: "kentucky", la: "louisiana",
  me: "maine", md: "maryland", ma: "massachusetts", mi: "michigan", mn: "minnesota", ms: "mississippi",
  mo: "missouri", mt: "montana", ne: "nebraska", nv: "nevada", nh: "new hampshire", nj: "new jersey",
  nm: "new mexico", ny: "new york", nc: "north carolina", nd: "north dakota", oh: "ohio", ok: "oklahoma",
  or: "oregon", pa: "pennsylvania", ri: "rhode island", sc: "south carolina", sd: "south dakota",
  tn: "tennessee", tx: "texas", ut: "utah", vt: "vermont", va: "virginia", wa: "washington",
  wv: "west virginia", wi: "wisconsin", wy: "wyoming", dc: "district of columbia",
};

function normalizeLocationInput(input: string) {
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    const stateKey = normalizeText(parts[1]);
    if (US_STATES[stateKey]) parts[1] = US_STATES[stateKey];
  }

  return normalizeText(parts.join(" "));
}

function getResultItems(data: any) {
  const tasks = Array.isArray(data?.tasks) ? data.tasks : [];
  const result = tasks?.[0]?.result?.[0];
  return Array.isArray(result?.items) ? result.items : [];
}

function getTaskError(data: any) {
  if (data?.status_code && data.status_code !== 20000) {
    return data.status_message || "DataForSEO request failed.";
  }
  const task = Array.isArray(data?.tasks) ? data.tasks[0] : null;
  if (task?.status_code && task.status_code !== 20000) {
    return task.status_message || "DataForSEO task failed.";
  }
  return "";
}

async function resolveLocationCode(authorization: string, input: string) {
  if (/^\d{5}$/.test(input.trim())) {
    throw new Error("Please enter a city and state, such as San Antonio, TX. ZIP-only searches are not supported yet.");
  }

  const response = await fetch("https://api.dataforseo.com/v3/serp/google/locations", {
    headers: { Authorization: authorization },
  });
  const data: any = await response.json();

  if (!response.ok) {
    throw new Error(data?.status_message || "Unable to load DataForSEO locations.");
  }

  const locations = Array.isArray(data?.tasks?.[0]?.result) ? data.tasks[0].result : [];
  const wanted = normalizeLocationInput(input);
  const wantedTokens = wanted.split(" ").filter(Boolean);

  const usLocations = locations.filter((item: any) => item?.country_iso_code === "US");

  const ranked = usLocations
    .map((item: any) => {
      const name = normalizeText(String(item?.location_name || ""));
      const tokensMatched = wantedTokens.filter((token) => name.includes(token)).length;
      let score = tokensMatched;
      if (name.startsWith(wanted)) score += 20;
      if (name === `${wanted} united states`) score += 30;
      if (String(item?.location_type || "").toLowerCase() === "city") score += 5;
      return { item, score };
    })
    .filter((entry: any) => entry.score >= wantedTokens.length)
    .sort((a: any, b: any) => b.score - a.score);

  const best = ranked[0]?.item;
  if (!best?.location_code) {
    throw new Error(`We couldn't match "${input}" to a Google location. Try City, State, for example: San Antonio, TX.`);
  }

  return {
    code: Number(best.location_code),
    name: String(best.location_name || input),
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return res.status(500).json({
      error: "Live rank checker is not configured yet. Add DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in Vercel.",
    });
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

  const authorization = `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`;
  const headers = {
    Authorization: authorization,
    "Content-Type": "application/json",
  };

  try {
    const resolvedLocation = await resolveLocationCode(authorization, location);
    const task = [{
      keyword,
      location_code: resolvedLocation.code,
      language_code: "en",
      depth: 100,
    }];

    const [organicResponse, mapsResponse] = await Promise.all([
      fetch("https://api.dataforseo.com/v3/serp/google/organic/live/advanced", {
        method: "POST",
        headers,
        body: JSON.stringify(task),
      }),
      fetch("https://api.dataforseo.com/v3/serp/google/maps/live/advanced", {
        method: "POST",
        headers,
        body: JSON.stringify(task),
      }),
    ]);

    const organicData: any = await organicResponse.json();
    const mapsData: any = await mapsResponse.json();

    if (!organicResponse.ok) {
      return res.status(organicResponse.status).json({ error: getTaskError(organicData) || "Unable to check Google organic rankings." });
    }
    if (!mapsResponse.ok) {
      return res.status(mapsResponse.status).json({ error: getTaskError(mapsData) || "Unable to check Google Maps rankings." });
    }

    const organicError = getTaskError(organicData);
    const mapsError = getTaskError(mapsData);
    if (organicError) return res.status(502).json({ error: organicError });
    if (mapsError) return res.status(502).json({ error: mapsError });

    const organicItems = getResultItems(organicData).filter((item: any) => item?.type === "organic");
    const organicResults = organicItems.map((item: any, index: number) => ({
      position: Number(item?.rank_absolute || item?.rank_group || index + 1),
      title: String(item?.title || ""),
      link: String(item?.url || ""),
      domain: normalizeDomain(String(item?.domain || item?.url || "")),
    }));

    const organicMatch = organicResults.find((item: any) => {
      const resultDomain = normalizeDomain(item.domain || item.link);
      return resultDomain === domain || resultDomain.endsWith(`.${domain}`);
    });

    const mapsItems = getResultItems(mapsData);
    const places = mapsItems
      .filter((item: any) => item && (item.type === "maps_search" || item.type === "maps" || item.title || item.address))
      .map((item: any, index: number) => ({
        position: Number(item?.rank_absolute || item?.rank_group || index + 1),
        title: String(item?.title || item?.name || ""),
        address: String(item?.address || item?.address_info?.address || ""),
        rating: Number(item?.rating?.value ?? item?.rating ?? 0),
        ratingCount: Number(item?.rating?.votes_count ?? item?.rating_count ?? item?.reviews_count ?? 0),
        website: String(item?.url || item?.website || item?.domain || ""),
      }));

    const normalizedBusinessName = normalizeText(businessName);
    const mapsMatch = places.find((place: any) => {
      const placeDomain = normalizeDomain(place.website || "");
      const websiteMatches = Boolean(placeDomain && (placeDomain === domain || placeDomain.endsWith(`.${domain}`)));
      const normalizedPlaceName = normalizeText(place.title || "");
      const nameMatches = Boolean(
        normalizedBusinessName &&
        (normalizedPlaceName.includes(normalizedBusinessName) || normalizedBusinessName.includes(normalizedPlaceName))
      );
      return websiteMatches || nameMatches;
    });

    return res.status(200).json({
      keyword,
      website: domain,
      location: resolvedLocation.name,
      checkedAt: new Date().toISOString(),
      organic: organicMatch
        ? {
            found: true,
            position: organicMatch.position,
            title: organicMatch.title,
            link: organicMatch.link,
          }
        : { found: false, position: null },
      maps: mapsMatch
        ? {
            found: true,
            position: mapsMatch.position,
            title: mapsMatch.title,
            address: mapsMatch.address,
            rating: mapsMatch.rating,
            ratingCount: mapsMatch.ratingCount,
            website: mapsMatch.website,
          }
        : { found: false, position: null },
      topOrganic: organicResults.slice(0, 10),
      topMaps: places.slice(0, 10),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || "Unable to complete the live Google rank check." });
  }
}
