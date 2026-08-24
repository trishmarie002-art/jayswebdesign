import { readSession } from "../../lib/searchConsole.js";

export default function handler(req: any, res: any) {
  const session = readSession(req);
  res.status(200).json({ connected: Boolean(session?.accessToken || session?.refreshToken) });
}
