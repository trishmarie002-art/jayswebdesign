import { clearStateCookie, getStateCookie, redirectUri, setSessionCookie } from "../../lib/searchConsole";

export default async function handler(req: any, res: any) {
  const { code, state, error } = req.query || {};
  if (error) return res.redirect(`/google-rank-tracker?error=${encodeURIComponent(String(error))}`);
  if (!code || !state || state !== getStateCookie(req)) return res.status(400).send("Invalid or expired Google authorization request.");

  const body = new URLSearchParams({
    code: String(code),
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirect_uri: redirectUri(req),
    grant_type: "authorization_code",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data: any = await response.json();
  if (!response.ok || !data.access_token) return res.status(400).send("Google authorization could not be completed.");

  clearStateCookie(res);
  setSessionCookie(res, {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
  });
  res.redirect("/google-rank-tracker");
}
