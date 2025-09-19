// api/publications/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAll } from '../../src/lib/storage/list.js';
import { upload } from '../../src/lib/storage/upload.js';
import { randomUUID } from 'crypto';
import { applyCORS } from '../../src/lib/storage/cors.js';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString().startsWith(dateStr);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCORS(req, res)) return;

  // GET = list all publications
  if (req.method === 'GET') {
    try {
      const blobs = await getAll('publications');
      res.status(200).json(blobs);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(500).json({ ok: false, error: message || 'Failed to list publications' });
    }
    return;
  }

  // POST = create new publication
  if (req.method === 'POST') {
    try {
      const {
        title,
        content,
        date,
        publicationUrl,
        authors,
        venue,
      } = req.body ?? {};

      if (!title || typeof title !== 'string') {
        res.status(400).json({ ok: false, error: 'Invalid or missing title' });
        return;
      }
      if (!Array.isArray(content) || content.some(p => typeof p !== 'string' || !p.trim())) {
        res.status(400).json({ ok: false, error: 'Invalid content array' });
        return;
      }
      if (!date || typeof date !== 'string' || !isValidDate(date)) {
        res.status(400).json({ ok: false, error: 'Invalid or missing date (YYYY-MM-DD)' });
        return;
      }

      let normalizedPublicationUrl: string | undefined;
      if (publicationUrl !== undefined && publicationUrl !== null && `${publicationUrl}`.trim()) {
        if (typeof publicationUrl !== 'string') {
          res.status(400).json({ ok: false, error: 'Invalid publicationUrl' });
          return;
        }
        try {
          const parsed = new URL(publicationUrl);
          normalizedPublicationUrl = parsed.toString();
        } catch {
          res.status(400).json({ ok: false, error: 'Invalid publicationUrl' });
          return;
        }
      }

      let normalizedAuthors: string[] | undefined;
      if (authors !== undefined && authors !== null) {
        if (!Array.isArray(authors)) {
          res.status(400).json({ ok: false, error: 'Invalid authors' });
          return;
        }
        const trimmedAuthors = authors.map(author => {
          if (typeof author !== 'string') return '';
          return author.trim();
        });
        if (trimmedAuthors.some(author => !author)) {
          res.status(400).json({ ok: false, error: 'Invalid authors' });
          return;
        }
        normalizedAuthors = trimmedAuthors;
      }

      let normalizedVenue: string | undefined;
      if (venue !== undefined && venue !== null && `${venue}`.trim()) {
        if (typeof venue !== 'string') {
          res.status(400).json({ ok: false, error: 'Invalid venue' });
          return;
        }
        normalizedVenue = venue.trim();
      }

      const slug = slugify(title).slice(0, 10);
      const id = randomUUID();
      const filename = `${date}_${slug}_${id}.json`;

      const payload: Record<string, unknown> = { title, content, date };
      if (normalizedPublicationUrl) {
        payload.publicationUrl = normalizedPublicationUrl;
      }
      if (normalizedAuthors) {
        payload.authors = normalizedAuthors;
      }
      if (normalizedVenue) {
        payload.venue = normalizedVenue;
      }

      const jsonData = JSON.stringify(payload, null, 2);
      const result = await upload('publications', filename, jsonData);

      res.status(201).json({ ok: true, blob: result });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(500).json({ ok: false, error: message || 'Failed to create publication' });
    }
    return;
  }

  // other methods not allowed
  res.status(405).json({ ok: false, error: 'Method not allowed' });
}