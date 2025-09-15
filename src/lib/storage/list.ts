import { list } from '@vercel/blob';

export async function getAll(prefix: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }
  const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
  const result = await list({ token, prefix: normalizedPrefix });
  return result.blobs; // array of { url, pathname, size, uploadedAt, ... }
}
