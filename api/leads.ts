import type { Request, Response } from "express";

const FIREBASE_PROJECT_ID = "gen-lang-client-0175376500";
const FIRESTORE_DATABASE_ID = "ai-studio-cbe0ff19-a70d-47b0-9416-83275c77d1d2";
const FIREBASE_API_KEY = "AIzaSyCaykMv0wZLTGcKXW8a6kt6p0Z802Qvo-I";

const allowedSources = new Set([
  "chatbot",
  "contact_form",
  "price_estimator",
  "referral_form",
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function stringValue(value: string) {
  return { stringValue: value };
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body ?? {};

  // Bots commonly fill fields that are hidden from real visitors.
  if (body.companyFax) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, 200);
  const phone = clean(body.phone, 80);
  const businessName = clean(body.businessName, 200);
  const websiteType = clean(body.websiteType, 200);
  const source = clean(body.source, 50);

  if (!name || !phone || !businessName || !websiteType || !allowedSources.has(source)) {
    return res.status(400).json({ ok: false, error: "Required lead information is missing." });
  }

  const lead = {
    name,
    phone,
    businessName,
    websiteType,
    source,
    email: clean(body.email, 320),
    projectDescription: clean(body.projectDescription, 4000),
    website: clean(body.website, 1000),
    timestamp: new Date().toISOString(),
  };

  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}` +
    `/databases/${FIRESTORE_DATABASE_ID}/documents/leads?key=${FIREBASE_API_KEY}`;

  try {
    const firestoreResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: Object.fromEntries(
          Object.entries(lead).map(([key, value]) => [key, stringValue(value)])
        ),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!firestoreResponse.ok) {
      const details = await firestoreResponse.text();
      console.error("Firestore lead API error", firestoreResponse.status, details.slice(0, 500));
      return res.status(502).json({ ok: false, error: "Lead storage is temporarily unavailable." });
    }

    const saved = await firestoreResponse.json();
    const id = typeof saved.name === "string" ? saved.name.split("/").pop() : undefined;
    return res.status(201).json({ ok: true, id });
  } catch (error) {
    console.error("Lead API error", error);
    return res.status(502).json({ ok: false, error: "Lead storage is temporarily unavailable." });
  }
}
