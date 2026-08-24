import { clearSessionCookie } from "../../lib/searchConsole.js";

export default function handler(req: any, res: any) {
  clearSessionCookie(res);
  res.redirect("/google-rank-tracker");
}
