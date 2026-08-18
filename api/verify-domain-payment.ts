export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Stripe verification is not configured yet." });
  }

  const rawSessionId = Array.isArray(req.query?.session_id) ? req.query.session_id[0] : req.query?.session_id;
  const sessionId = String(rawSessionId || "").trim();
  if (!sessionId.startsWith("cs_")) {
    return res.status(400).json({ error: "Invalid checkout session." });
  }

  try {
    const stripeResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      return res.status(502).json({ error: session?.error?.message || "Unable to verify payment." });
    }

    const paid = session.payment_status === "paid";
    return res.status(200).json({
      paid,
      domain: session.metadata?.domain || null,
      firstName: session.metadata?.first_name || null,
      lastName: session.metadata?.last_name || null,
      email: session.customer_details?.email || session.metadata?.email || null,
      amountTotal: session.amount_total || null,
      currency: session.currency || "usd",
      paymentStatus: session.payment_status || null,
    });
  } catch (error) {
    console.error("Stripe payment verification failed:", error);
    return res.status(500).json({ error: "Unable to verify payment." });
  }
}
