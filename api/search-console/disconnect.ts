import { clearSessionCookie } from "../../lib/searchConsole";

export default function handler(req: any, res: any) {
  clearSessionCookie(res);
  res.redirect("/google-rank-tracker");
}
