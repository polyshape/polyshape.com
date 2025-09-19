import { put } from '@vercel/blob';

export async function upload(prefix: string, name: string, data: Blob | ArrayBuffer | Buffer | string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }
  const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
  const pathname = `${normalizedPrefix}${name}`;
  const result = await put(pathname, data, {
    token,
    access: 'public'
  });
  return result;
}
