import fs from 'node:fs';
import { services, cities } from '../src/data/content.js';
const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '');
if (!site) { console.error('Set SITE_URL (e.g. https://www.example.com) before building.'); process.exit(1); }
const paths = ['/', '/services', ...services.filter(s => s.page).map(s => `/services/${s.slug}`), ...cities.map(c => `/chimney-service-${c.slug}`), '/about', '/contact', '/privacy-policy'];
fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log('Wrote sitemap.xml and robots.txt for', site);
