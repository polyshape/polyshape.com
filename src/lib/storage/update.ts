import { put } from '@vercel/blob';

export async function putFile(
  prefix: string,
  pathname: string,
  contents: string | Buffer,
  contentType = 'application/octet-stream'
) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }

  const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
  const fullPath = `${normalizedPrefix}${pathname}`;

  const blob = await put(fullPath, contents, {
    access: 'public',
    token,
    contentType,
     allowOverwrite: true,
  });

  return blob; // { url, pathname, size, uploadedAt, ... }
}
