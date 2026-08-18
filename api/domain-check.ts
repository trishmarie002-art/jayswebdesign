export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawDomain = Array.isArray(req.query?.domain) ? req.query.domain[0] : req.query?.domain;
  const domain = String(rawDomain || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\s+/g, "");

  const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

  if (!domainPattern.test(domain)) {
    return res.status(400).json({ error: "Enter a valid domain name, like mybusiness.com" });
  }

  try {
    const response = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: {
        Accept: "application/rdap+json, application/json",
        "User-Agent": "JaysWebDesignServices-DomainChecker/1.0",
      },
      redirect: "follow",
    });

    if (response.status === 404) {
      return res.status(200).json({ domain, available: true });
    }

    if (response.ok) {
      return res.status(200).json({ domain, available: false });
    }

    return res.status(502).json({
      error: "We could not confirm that domain right now. Please try again in a moment.",
    });
  } catch (error) {
    console.error("Domain lookup failed:", error);
    return res.status(500).json({
      error: "We could not check that domain right now. Please try again.",
    });
  }
}
