import fs from 'node:fs';
import { services, cities } from '../src/data/content.js';

if (fs.existsSync('.env')) {
  try {
    process.loadEnvFile('.env');
  } catch (e) {}
}

const rawSite = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://chimneyservicecleaning.in').replace(/\/$/, '');
const isLocal = !rawSite || rawSite.includes('localhost') || rawSite.includes('127.0.0.1');
const site = isLocal ? 'https://chimneyservicecleaning.in' : rawSite;

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  ...services.filter(s => s.page).map(s => ({
    path: `/services/${s.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  })),
  { path: '/locations', priority: '0.9', changefreq: 'weekly' },
  ...cities.map(c => ({
    path: `/chimney-service-in-${c.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  })),
  ...cities.map(c => ({
    path: `/locations/${c.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  })),
  ...cities.map(c => ({
    path: `/chimney-service-${c.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  })),
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' }
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    r => `  <url>
    <loc>${site}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

# Sitemap location
Sitemap: ${site}/sitemap.xml
`;

fs.writeFileSync('public/sitemap.xml', sitemapXml);
fs.writeFileSync('public/robots.txt', robotsTxt);
console.log(`[SEO] Generated sitemap.xml (${routes.length} URLs) and robots.txt for canonical host: ${site}`);
