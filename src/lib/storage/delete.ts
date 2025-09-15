import { del } from '@vercel/blob';

export async function remove(prefix: string, filename: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }

  const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
  const safeName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const pathname = `${normalizedPrefix}${safeName}`;

  return await del(pathname, { token });
}