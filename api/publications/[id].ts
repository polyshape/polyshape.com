import type { VercelRequest, VercelResponse } from '@vercel/node';
import { remove } from '../../src/lib/storage/delete.js';
import { putFile } from '../../src/lib/storage/update.js';
import { applyCORS } from '../../src/lib/storage/cors.js';
import { list } from '@vercel/blob';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCORS(req, res)) return;

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ ok: false, error: 'Missing publication id' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) {
        res.status(500).json({ ok: false, error: 'Missing BLOB_READ_WRITE_TOKEN' });
        return;
      }

      const safeName = id.endsWith('.json') ? id : `${id}.json`;
      const pathname = `publications/${safeName}`;

      const { blobs } = await list({ prefix: pathname, token });
      const blob = blobs.find(b => b.pathname === pathname);

      if (!blob) {
        res.status(404).json({ ok: false, error: 'Publication not found' });
        return;
      }

      const r = await fetch(blob.url);
      if (!r.ok) {
        res.status(500).json({ ok: false, error: `Failed to fetch blob: ${r.status}` });
        return;
      }

      const content = await r.json();
      res.status(200).json({ ok: true, id: safeName, content });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(500).json({ ok: false, error: message || 'Failed to fetch publication' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const result = await remove('publications', id);
      res.status(200).json({ ok: true, deleted: result });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(500).json({ ok: false, error: message || 'Failed to delete publication' });
    }
    return;
  }

  if (req.method === 'PUT') {
    try {
      const { contents, contentType } = req.body ?? {};

      if (!contents || typeof contents !== 'string') {
        res.status(400).json({ ok: false, error: 'Invalid or missing contents' });
        return;
      }

      const blob = await putFile('publications', id, contents, contentType);
      res.status(200).json({ ok: true, blob });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(500).json({ ok: false, error: message || 'Failed to update publication' });
    }
    return;
  }

  res.status(405).json({ ok: false, error: 'Method not allowed' });
}
