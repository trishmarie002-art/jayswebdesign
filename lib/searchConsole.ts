import crypto from "crypto";

export type SearchConsoleSession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
};

const COOKIE = "jays_gsc_session";
const STATE_COOKIE = "jays_gsc_state";

function secret() {
  const value = process.env.SEARCH_CONSOLE_SESSION_SECRET;
  if (!value) throw new Error("SEARCH_CONSOLE_SESSION_SECRET is not configured");
  return crypto.createHash("sha256").update(value).digest();
}

function seal(payload: unknown) {
  const key = secret();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload));
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

function unseal<T>(value?: string): T | null {
  if (!value) return null;
  try {
    const raw = Buffer.from(value, "base64url");
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const encrypted = raw.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", secret(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    return null;
  }
}

export function parseCookies(req: any) {
  const header = req.headers?.cookie || "";
  return Object.fromEntries(header.split(";").map((part: string) => part.trim()).filter(Boolean).map((part: string) => {
    const idx = part.indexOf("=");
    return [decodeURIComponent(idx >= 0 ? part.slice(0, idx) : part), decodeURIComponent(idx >= 0 ? part.slice(idx + 1) : "")];
  }));
}

export function setStateCookie(res: any, state: string) {
  res.setHeader("Set-Cookie", `${STATE_COOKIE}=${encodeURIComponent(state)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
}

export function getStateCookie(req: any) {
  return parseCookies(req)[STATE_COOKIE] || "";
}

export function clearStateCookie(res: any) {
  res.setHeader("Set-Cookie", `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
}

export function setSessionCookie(res: any, session: SearchConsoleSession) {
  const value = seal(session);
  res.setHeader("Set-Cookie", `${COOKIE}=${encodeURIComponent(value)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`);
}

export function clearSessionCookie(res: any) {
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
}

export function readSession(req: any) {
  return unseal<SearchConsoleSession>(parseCookies(req)[COOKIE]);
}

export async function getAccessToken(req: any, res: any) {
  const session = readSession(req);
  if (!session) return null;
  if (session.expiresAt > Date.now() + 60_000) return session.accessToken;
  if (!session.refreshToken) return null;

  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    refresh_token: session.refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!response.ok) return null;
  const data: any = await response.json();
  const next: SearchConsoleSession = {
    accessToken: data.access_token,
    refreshToken: session.refreshToken,
    expiresAt: Date.now() + (Number(data.expires_in || 3600) * 1000),
  };
  setSessionCookie(res, next);
  return next.accessToken;
}

export function redirectUri(req?: any) {
  return process.env.GOOGLE_REDIRECT_URI || "https://jayswebdesignservices.com/api/search-console/callback";
}
