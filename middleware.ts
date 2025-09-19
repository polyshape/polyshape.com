const ADMIN_ORIGIN = 'https://polyshape-admin.vercel.app';

export const config = {
  matcher: ['/api/:path*'],
};

export default function middleware(request: Request): Response | void {
  if (request.method !== 'OPTIONS') return;

  const origin = request.headers.get('origin');
  const allowOrigin = origin === ADMIN_ORIGIN ? origin : ADMIN_ORIGIN;
  const requestedHeaders = request.headers.get('access-control-request-headers') ?? 'Content-Type, Authorization';

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': requestedHeaders,
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  });
}