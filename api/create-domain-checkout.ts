function normalizeDomain(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\s+/g, "");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Stripe checkout is not configured yet." });
  }

  const { domain: rawDomain, firstName, lastName, email } = req.body || {};
  const domain = normalizeDomain(rawDomain);
  const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

  if (!domainPattern.test(domain)) {
    return res.status(400).json({ error: "Enter a valid domain name." });
  }
  if (!String(firstName || "").trim() || !String(lastName || "").trim()) {
    return res.status(400).json({ error: "First and last name are required." });
  }
  if (!/^\S+@\S+\.\S+$/.test(String(email || "").trim())) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    // Re-check availability immediately before checkout so we do not knowingly
    // accept payment for a domain that is already registered.
    const availabilityResponse = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: {
        Accept: "application/rdap+json, application/json",
        "User-Agent": "JaysWebDesignServices-DomainChecker/1.0",
      },
      redirect: "follow",
    });

    if (availabilityResponse.ok) {
      return res.status(409).json({ error: "That domain is no longer available. Please search for another domain." });
    }
    if (availabilityResponse.status !== 404) {
      return res.status(502).json({ error: "We could not reconfirm domain availability. Please try again." });
    }

    const origin = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`;
    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("success_url", `${origin}/?domain_order=success&session_id={CHECKOUT_SESSION_ID}#domain-search`);
    params.set("cancel_url", `${origin}/?domain_order=cancelled#domain-search`);
    params.set("customer_email", String(email).trim());
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", "4000");
    params.set("line_items[0][price_data][product_data][name]", `Domain Purchase Service: ${domain}`);
    params.set("line_items[0][price_data][product_data][description]", "Jay's Web Design Services will purchase and register the selected domain after successful payment and final availability confirmation.");
    params.set("metadata[domain]", domain);
    params.set("metadata[first_name]", String(firstName).trim());
    params.set("metadata[last_name]", String(lastName).trim());
    params.set("metadata[email]", String(email).trim());
    params.set("metadata[order_type]", "domain_purchase_service");
    params.set("payment_intent_data[metadata][domain]", domain);
    params.set("payment_intent_data[metadata][customer_name]", `${String(firstName).trim()} ${String(lastName).trim()}`);
    params.set("payment_intent_data[metadata][customer_email]", String(email).trim());

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session?.url) {
      console.error("Stripe Checkout Session error:", session);
      return res.status(502).json({ error: session?.error?.message || "Unable to start secure checkout." });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Domain checkout creation failed:", error);
    return res.status(500).json({ error: "Unable to start secure checkout. Please try again." });
  }
}
