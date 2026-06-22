import type { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if ((req as any).method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { query } = parse(req.url || '', true);
  const imageUrl = query.url as string;

  if (!imageUrl) {
    res.writeHead(400);
    res.end('Missing ?url= parameter');
    return;
  }

  // Only allow images from the CRM domain
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    res.writeHead(400);
    res.end('Invalid URL');
    return;
  }

  const allowedHosts = ['apinmo.com', 'procesos.apinmo.com', 'cdn.apinmo.com'];
  const isAllowed = allowedHosts.some(
    host => parsedUrl.hostname === host || parsedUrl.hostname.endsWith('.' + host)
  );

  if (!isAllowed) {
    res.writeHead(403);
    res.end('Domain not allowed');
    return;
  }

  try {
    const upstream = await fetch(imageUrl, {
      headers: { 'User-Agent': 'EssenciaInmobiliaria/1.0' },
    });

    if (!upstream.ok) {
      res.writeHead(upstream.status);
      res.end(`Upstream error: ${upstream.statusText}`);
      return;
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = await upstream.arrayBuffer();

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800', // 1 day cache
      'Content-Length': buffer.byteLength.toString(),
    });
    res.end(Buffer.from(buffer));
  } catch (err) {
    console.error('Image proxy error:', err);
    res.writeHead(500);
    res.end('Failed to fetch image');
  }
}
