import type { IncomingMessage, ServerResponse } from 'http';

const CRM_FEED_URL =
  'https://procesos.apinmo.com/portal/kyeroagencias3/1909-kyero-eCSz1ipe-facilitea.xml';

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const upstream = await fetch(CRM_FEED_URL, {
      headers: {
        'User-Agent': 'EssenciaInmobiliaria/1.0',
      },
    });

    if (!upstream.ok) {
      res.writeHead(upstream.status);
      res.end(`Upstream error: ${upstream.statusText}`);
      return;
    }

    const xml = await upstream.text();

    res.writeHead(200, {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    });
    res.end(xml);
  } catch (err) {
    console.error('CRM feed proxy error:', err);
    res.writeHead(500);
    res.end('Failed to fetch property feed');
  }
}
