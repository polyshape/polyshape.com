import type { VercelRequest, VercelResponse } from '@vercel/node';

export function applyCORS(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin as string | undefined;
  const allowOrigin = origin === 'https://polyshape-admin.vercel.app' ? origin : 'https://polyshape-admin.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  const requested = (req.headers['access-control-request-headers'] as string) || 'Content-Type, Authorization';
  res.setHeader('Access-Control-Allow-Headers', requested);
  // If credentials/cookies are used by the frontend, uncomment the next line.
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
}
