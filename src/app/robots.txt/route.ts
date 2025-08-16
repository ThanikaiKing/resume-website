import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml

# Optimization for search engines
Crawl-delay: 1

# Block common bot traps
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
