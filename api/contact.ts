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

  let payload: Record<string, unknown> = {};
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    // ignore JSON parse errors; validation below will handle missing fields
  }

  const { name = '', email = '', message = '', company = '' } = (payload as Record<string, string | undefined>);

  if (company) {
    return res.status(200).json({ ok: true, dryRun: true });
  }
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  if (!RE_EMAIL.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }
  if (String(name).length > 200 || String(message).length > 8000) {
    return res.status(400).json({ ok: false, error: 'Field too long' });
  }

  const proc = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
  const env = proc?.env;
  const dryRun = (env?.DRY_RUN ?? 'true') !== 'false';
  const sendEmails = env?.SEND_EMAILS === 'true';

  if (dryRun || !sendEmails) {
    try {
      console.log('[contact:dry-run]', {
        name,
        email,
        messagePreview: String(message).slice(0, 200) + (String(message).length > 200 ? '…' : ''),
      });
    } catch (err) {
      try {
        console.error('[contact:dry-run-log-error]', err);
      } catch {
        // ignore
      }
    }
    return res.status(200).json({ ok: true, dryRun: true });
  }

  // --- LIVE SEND VIA POSTMARK ---
  if (!env?.POSTMARK_TOKEN || !env?.CONTACT_FROM || !env?.CONTACT_TO) {
    return res
      .status(500)
      .json({ ok: false, error: 'Server email config missing' });
  }

  try {
    const { ServerClient } = await import('postmark');
    const client = new ServerClient(env.POSTMARK_TOKEN);

    await client.sendEmail({
      From: env.CONTACT_FROM,
      To: env.CONTACT_TO,
      ReplyTo: email,
      Subject: `Contact: ${name}`,
      TextBody: `From: ${name} <${email}>\n\n${String(message)}`,
      MessageStream: 'outbound',
    });

    return res.status(200).json({ ok: true, dryRun: false });
  } catch (err) {
    try {
      console.error('[contact:send-error]', err);
    } catch {
      // ignore
    }
    return res.status(500).json({ ok: false, error: 'Email send failed' });
  }
}
