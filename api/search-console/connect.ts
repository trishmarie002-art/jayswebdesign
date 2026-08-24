import crypto from "crypto";
import { redirectUri, setStateCookie } from "../../lib/searchConsole";

export default function handler(req: any, res: any) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.SEARCH_CONSOLE_SESSION_SECRET) {
    return res.status(500).send("Google Search Console connection is not configured yet.");
  }

  const state = crypto.randomBytes(24).toString("hex");
  setStateCookie(res, state);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri(req),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    state,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
