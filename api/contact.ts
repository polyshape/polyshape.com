// Minimal contact API for Vercel. Dry-run only (no emails sent).

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface HttpReq {
  method?: string;
  body?: unknown;
}

interface HttpRes {
  setHeader(name: string, value: string): void;
  status(code: number): HttpRes;
  json(body: unknown): void;
}

export default async function handler(req: HttpReq, res: HttpRes) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Accept both JSON string body and parsed objects
  let payload: Record<string, unknown> = {};
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    // ignore JSON parse errors; validation below will handle missing fields
  }

  const { name = '', email = '', message = '', company = '' } = (payload as Record<string, string | undefined>);

  // Honeypot and minimal validation
  if (company) return res.status(200).json({ ok: true, dryRun: true });
  if (!email || !message) return res.status(400).json({ ok: false, error: 'Missing required fields' });
  if (!RE_EMAIL.test(email)) return res.status(400).json({ ok: false, error: 'Invalid email' });
  if (String(name).length > 200 || String(message).length > 8000) return res.status(400).json({ ok: false, error: 'Field too long' });

  // For now, we never send real emails. DRY_RUN defaults to true unless explicitly set to 'false'.
  const proc = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
  const env = proc?.env;
  const dryRun = (env?.DRY_RUN ?? 'true') !== 'false';
  if (dryRun) {
    try {
      console.log('[contact:dry-run]', {
        name,
        email,
        messagePreview: String(message).slice(0, 200) + (String(message).length > 200 ? '…' : ''),
      });
    } catch (err) {
      // If logging fails for some reason, surface to function logs and proceed.
      try { console.error('[contact:dry-run-log-error]', err); } catch { /* ignore */ }
    }
    return res.status(200).json({ ok: true, dryRun: true });
  }

  // If someone explicitly disables DRY_RUN, still don’t send yet; acknowledge success.
  return res.status(200).json({ ok: true, dryRun: false, info: 'Email sending not enabled yet' });
}
